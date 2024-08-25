const express = require('express');
const { fetchAndSaveNews } = require('../controllers/newsController');

const router = express.Router();

router.get('/fetch-news', async (req, res) => {
  await fetchAndSaveNews();
  res.send('News fetched and saved to MongoDB');
});

module.exports = router;
