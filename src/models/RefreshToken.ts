import mongoose from "mongoose";

const RefreshToken = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    index: true,
    type: Date,
    default: Date.now,
    expires: 7776000, // 90 days,
  },
});

export default mongoose.model("RefreshToken", RefreshToken);
