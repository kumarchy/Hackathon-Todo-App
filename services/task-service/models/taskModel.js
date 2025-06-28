import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: Date,
  userId: { type: String, required: true }, // ✅ link to JWT userId
  sharedWith: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const taskModel = mongoose.model("Task", taskSchema);
