// routes/taskRoutes.js
import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

// Routes
router.post('/createTask', createTask);        
router.get('/getTask', getTasks); 
router.put('/updateTask/:id', updateTask);      
router.delete('/deleteTask/:id', deleteTask);   

export default router;
