import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true,  maxlength: 200 },
  description: { type: String, required: true,  default: '', },
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
  dueDate: {
    type: Date,
    required: true,
  },
  userId: { type: String, required: true }, 
  sharedWith: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const taskModel = mongoose.model("Task", taskSchema);
