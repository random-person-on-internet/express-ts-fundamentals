import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  balance: number;
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
