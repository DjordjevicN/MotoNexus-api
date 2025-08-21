import mongoose from "mongoose";
import { Motorcycle } from "../models/motorcycle.model.js";
import { Trip } from "../models/trip.model.js";
import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";

export async function deleteUserCascade(userId: string) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const uid = new mongoose.Types.ObjectId(userId);

    // 1) Delete user-owned resources
    await Motorcycle.deleteMany({ owner: uid }, { session });
    await Trip.deleteMany({ owner: uid }, { session });
    await Event.deleteMany({ owner: uid }, { session });

    // 2) Remove user from many-to-many relationships (they might be a participant/member)
    await Event.updateMany(
      { participants: uid },
      { $pull: { participants: uid } },
      { session }
    );
    await Trip.updateMany(
      { members: uid },
      { $pull: { members: uid } },
      { session }
    );

    // 3) Finally delete the user
    await User.deleteOne({ _id: uid }, { session });

    await session.commitTransaction();
    session.endSession();
    return { ok: true };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}
