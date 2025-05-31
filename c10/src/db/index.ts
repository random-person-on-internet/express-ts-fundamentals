import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `\n MongoDB connected!! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`MONGODB connection error: ${error}`);
  }
};

export default connectDB;
