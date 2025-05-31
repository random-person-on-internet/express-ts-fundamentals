import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { Transaction } from "../models/transaction.model";

dotenv.config();

const seed = async () => {
  try {
    console.log(
      "Connecting to:",
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

    await User.deleteMany();
    await Transaction.deleteMany();

    await User.insertMany([
      { name: "Alice", balance: 500 },
      { name: "Bob", balance: 300 },
      { name: "Charlie", balance: 1000 },
    ]);

    console.log("Seeding completed.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();
