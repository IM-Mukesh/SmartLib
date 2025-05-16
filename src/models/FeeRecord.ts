import mongoose from "mongoose";

const feeRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  month: { type: Number, required: true }, // 1-12 for months
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FeeRecord", feeRecordSchema);
