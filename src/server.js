const express = require('express');
const api = require('./api');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/ratings', (req, res) => {
  const ratings = api.getRatings();
  res.json(ratings);
});

app.post('/api/ratings', (req, res) => {
  const { rating } = req.body;
  api.saveRating(rating);
  res.sendStatus(200);
});

app.get('/api/total-ratings', (req, res) => {
  const totalRatings = api.calculateTotalRatings();
  res.json({ totalRatings });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
