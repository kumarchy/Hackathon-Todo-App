// routes/taskRoutes.js
import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
  shareTask
} from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

// Routes
router.post('/createTask', createTask);        
router.get('/getTask', getTasks); 
router.get('/getTask/:id', getTaskById);
router.put('/updateTask/:id', updateTask);      
router.delete('/deleteTask/:id', deleteTask);   
router.get('/searchTask', searchTasks);
router.put('/shareTask/:id', shareTask);

export default router;
