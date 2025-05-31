import mongoose from "mongoose";
import { User } from "../models/user.model";
import { Transaction } from "../models/transaction.model";
import { Request, Response } from "express";

export const transferMoney = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { from, to, amount } = req.body;

    const amountNumber = Number(amount);

    if (!from || !to || !amountNumber || from === to || amountNumber <= 0) {
      throw new Error("Invalid transfer details");
    }

    const sender = await User.findById(from).session(session);
    const receiver = await User.findById(to).session(session);

    if (!sender || !receiver) throw new Error("User not found");
    if (sender.balance < amountNumber) throw new Error("Insufficient balance");

    // deduct from sender
    await User.updateOne(
      { _id: from },
      { $inc: { balance: -amountNumber } },
      { session }
    );

    // add to receiver
    await User.updateOne(
      { _id: to },
      { $inc: { balance: amountNumber } },
      { session }
    );

    // log transaction
    await Transaction.create(
      [
        {
          from,
          to,
          amount,
          status: "completed",
        },
      ],
      { session }
    );

    // commit
    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successful" });
  } catch (err: any) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message || "Transfer failed" });
  } finally {
    session.endSession();
  }
};

export const refundMoney = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      throw new Error("Transaction ID is required");
    }

    const originalTx = await Transaction.findById(transactionId).session(
      session
    );
    if (!originalTx) throw new Error("Transaction not found");
    if (originalTx.status === "refunded")
      throw new Error("Transaction already refunded");

    const { from: senderId, to: receiverId, amount } = originalTx;

    await User.updateOne(
      { _id: senderId },
      { $inc: { balance: amount } },
      { session }
    );

    await User.updateOne(
      { _id: receiverId },
      { $inc: { balance: -amount } },
      { session }
    );

    originalTx.status = "refunded";
    await originalTx.save({ session });

    await Transaction.create(
      [
        {
          from: receiverId,
          to: senderId,
          amount,
          status: "refunded",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({ message: "Refund successful" });
  } catch (e: any) {
    await session.abortTransaction();
    res.status(500).json({ error: e.message || "Refund failed" });
  } finally {
    session.endSession();
  }
};
