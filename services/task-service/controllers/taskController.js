import { taskModel } from "../models/taskModel";

export const createTask = async (req, res) => {
  try {
    const task = new taskModel(req.body);
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error: error.message });
  }
}