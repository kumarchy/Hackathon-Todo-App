import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import taskRoute from './routes/taskRoute.js';

import limiter from './middleware/rateLimiter.js';
import logger from './middleware/logger.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(logger);
dotenv.config();

app.use('/user', userRoutes);
app.use('/task', taskRoute);

const PORT = process.env.PORT || 5003;

app.get('/', (req, res) => {
  res.send('HELLO WELCOME EVERYONE TO gateway!');
}
);

app.listen(PORT, () => {
  console.log(`Gateway Server is running on port ${PORT}`);
});