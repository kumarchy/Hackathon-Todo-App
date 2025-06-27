import express from 'express';

const app = express();


app.get('/task', (req, res) => {
  res.send('Task Service is running');
}); 

app.listen(3000, () => {
  console.log('Task Service is running on port 3000');
});