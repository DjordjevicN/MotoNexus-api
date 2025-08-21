import { Schema, model, InferSchemaType } from "mongoose";

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
    mainImage: { type: String },
    photos: [{ type: String }],
    price: { type: Number, required: true },
    availableForPurchase: { type: Boolean, default: false },
    title: { type: String },
    isNew: { type: Boolean, default: false },
    isPriceFixed: { type: Boolean, default: false },
    keyForKey: { type: String, required: true },
    motorcycleType: { type: String, required: true },
    engineCapacity: { type: Number, required: true },
    horsepower: { type: Number, required: true },
    mileage: { type: Number, required: true },
    transmission: { type: String, required: true },
    registeredUntil: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
MotorcycleSchema.index({ motorcycleType: 1 });
MotorcycleSchema.index({ price: 1 });
MotorcycleSchema.index({ engineCapacity: 1 });
MotorcycleSchema.index({ horsepower: 1 });
MotorcycleSchema.index({ mileage: 1 });

export type MotorcycleDoc = InferSchemaType<typeof MotorcycleSchema>;
export const Motorcycle = model<MotorcycleDoc>("Motorcycle", MotorcycleSchema);
