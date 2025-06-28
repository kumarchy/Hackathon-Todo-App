import { taskModel } from "../models/taskModel.js";

// 📌 Create a task
export const createTask = async (req, res) => {
  try {
    const task = await taskModel.create({
      ...req.body,
      userId: req.user.userId, // userId is injected by verifyToken middleware
    });
    
    // 👇 Emit real-time update
    const io = req.app.get('io');
    io.emit('task_created', task);

    res.status(201).json(task);
  } catch (err) {
    console.error('Create Task Error:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// 📌 Get all tasks for the user
export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({
  $or: [
    { userId: req.user.userId }, // Owned by user
    { sharedWith: req.user.userId }, // Shared with user
  ],
}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Fetch Tasks Error:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// 📌 Update a task
export const updateTask = async (req, res) => {
  try {
    const updated = await taskModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Task not found or unauthorized' });
    
    const io = req.app.get('io');
    io.emit('task_updated', updated);

    res.json(updated);
  } catch (err) {
    console.error('Update Task Error:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// 📌 Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await taskModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deleted) return res.status(404).json({ error: 'Task not found or unauthorized' });
    
    const io = req.app.get('io');
    io.emit('task_deleted', { id: deleted._id });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete Task Error:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};