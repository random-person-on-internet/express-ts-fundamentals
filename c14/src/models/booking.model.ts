import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  room: { type: Number, required: true },
  status: { type: String, enum: ["booked", "checked-in", "cancelled"] },
  createdAt: { type: Date, default: Date.now },
});
bookingSchema.index({ status: 1 }); // optimization for status filtering
export default mongoose.model("Booking", bookingSchema);
