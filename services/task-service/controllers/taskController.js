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

// 📌 Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findOne({
      _id: req.params.id,
      $or: [
        { userId: req.user.userId },
        { sharedWith: req.user.userId },
      ],
    });

    if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });

    res.json(task);
  } catch (err) {
    console.error('Get Task By ID Error:', err);
    res.status(500).json({ error: 'Failed to fetch task' });
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

// 📌 Search tasks
export const searchTasks = async (req, res) => {
  try {
    const { query } = req.query;

    const tasks = await taskModel.find({
      $and: [
        {
          $or: [
            { userId: req.user.userId },
            { sharedWith: req.user.userId }
          ]
        },
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Search Tasks Error:', err);
    res.status(500).json({ error: 'Failed to search tasks' });
  }
};

export const shareTask = async (req, res) => {
  try {
    const { email } = req.body;
    const { id: taskId } = req.params;

    const userToShareWith = await UserModel.findOne({ email });
    if (!userToShareWith) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = await taskModel.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const shareId = userToShareWith.id; // UUID string
    if (!task.sharedWith.includes(shareId)) {
      task.sharedWith.push(shareId);
      await task.save();
    }

    const io = req.app.get('io');
    io.emit('task_shared', { taskId: task._id, sharedWith: email });

    res.status(200).json({ message: `Task shared with ${email}` });
  } catch (err) {
    console.error('Share Task Error:', err);
    res.status(500).json({ error: 'Failed to share task' });
  }
};