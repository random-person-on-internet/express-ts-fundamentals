import mongoose from "mongoose";

export interface ITransaction extends mongoose.Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  status: "completed" | "failed" | "refunded";
}

const TransactionSchema: mongoose.Schema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["completed", "failed", "refunded"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
