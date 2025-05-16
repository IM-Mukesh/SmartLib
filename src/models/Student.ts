import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  joinDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Student", studentSchema);
