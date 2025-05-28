import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type_id: {
    type: Number,
    default: 0, // 0-user, 1-admin
  },
});

const User = mongoose.model("User", userSchema);
export default User;
