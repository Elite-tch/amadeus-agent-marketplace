import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  publicKey: string;
  role?: "user" | "developer" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    publicKey: {
      type: String,
      required: [true, "Public key is required"],
      unique: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "developer", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
