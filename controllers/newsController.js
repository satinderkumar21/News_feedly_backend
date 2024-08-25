const Article = require('../models/articleModel');
const axios = require('axios')

exports.fetchAndSaveNews = async () => {
  

  const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=5ebc78bf47994201a2ad402d7ba38b05`;

  try {
    const response = await axios.get(url);
    console.log("REsponseee",response)
    const articles = response.data.articles;
    console.log("articles",articles[0])
    

    articles.forEach(async (article) => {
      const newArticle = new Article({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
      });

     

     await newArticle.save();
    });

    console.log('News articles saved to MongoDB');
  } catch (error) {
    console.error('Error fetching news:', error.message);
  }
};