import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/user', (req, res) => {
  res.send('user Service is running');
}); 

app.listen(PORT, () => console.log(`User Service running on ${PORT}`));