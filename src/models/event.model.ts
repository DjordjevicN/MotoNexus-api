import { Schema, model, InferSchemaType } from "mongoose";

const EventSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    }, // creator
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: {
      name: String,
      lat: Number,
      lng: Number,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User", index: true }], // attendees
    coverImageUrl: { type: String },
    rules: [{ type: String }],
    description: { type: String },
    maxRiders: { type: Number },
    createdAt: { type: Date, default: Date.now },
    country: { type: String },
    address: { type: String },
    city: { type: String },
    price: { type: Number },
    rideType: { type: String },
  },
  { timestamps: true }
);

export type EventDoc = InferSchemaType<typeof EventSchema>;
export const Event = model<EventDoc>("Event", EventSchema);
