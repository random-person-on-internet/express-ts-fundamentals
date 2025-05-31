import mongoose, { Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  cuisine: string;
  price: number;
  tags: string[];
  availiable: boolean;
}

const MenuItemSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String], default: [] },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
