import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  displayName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  avatarUrl: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
});
export type UserDoc = InferSchemaType<typeof UserSchema>;
export const User = model<UserDoc>("User", UserSchema);
