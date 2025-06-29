import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { connectDB } from './db/db.config.js';
import router from './routes/taskRoute.js';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

app.use('/task',router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

// 👉 Make io accessible in routes/controllers
app.set('io', io);

app.get('/task', (req, res) => {
  res.send('Task service with Socket.IO is running');
}); 

server.listen(PORT, () => {
  console.log(`Task Service is running on port ${PORT}`);
});