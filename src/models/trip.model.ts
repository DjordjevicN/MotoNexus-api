import { Schema, model, Types, InferSchemaType } from "mongoose";

const TripSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    route: [
      {
        lat: Number,
        lng: Number,
        note: String,
      },
    ],
    members: [{ type: Schema.Types.ObjectId, ref: "User", index: true }],
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export type TripDoc = InferSchemaType<typeof TripSchema>;
export const Trip = model<TripDoc>("Trip", TripSchema);
