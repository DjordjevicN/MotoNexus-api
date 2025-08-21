import { Schema, model, InferSchemaType, Types } from "mongoose";

const MotorcycleSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: Number,
    // optional photos by URL
    photos: [{ type: String }],
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export type MotorcycleDoc = InferSchemaType<typeof MotorcycleSchema>;
export const Motorcycle = model<MotorcycleDoc>("Motorcycle", MotorcycleSchema);
