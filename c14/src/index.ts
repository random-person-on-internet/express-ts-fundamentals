import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookings.routes";

dotenv.config();
const app = express();
app.use("/api/bookings", bookingRoutes);
const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI!}/hotel-booking`)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((e) => console.error("MongoDB connection error:", e));
