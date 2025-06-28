// routes/userRoutes.js
import express from 'express';
import { googleOAuthLogin } from '../controllers/userController.js'; 

const router = express.Router();

// Debug: Log when this route is being set up
console.log('Setting up /auth/google route');

router.post('/auth/google', googleOAuthLogin);

export default router;