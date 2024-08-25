require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cron = require('node-cron');
const userRoutes  = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const { fetchAndSaveNews } = require('./controllers/newsController');
const port = process.env.PORT || 4002;


const app = express();

app.use(cors())

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
//routes
app.use('/api/user', userRoutes );

// Use the news routes
app.use('/api/news', newsRoutes);

// Schedule the cron job to run every 24 hours
cron.schedule('0 0 * * * ', () => {
  console.log('Running cron job to fetch news...');
  fetchAndSaveNews();
});



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(port, ()=>{
        console.log('db connected & listen the port', port)
    })
})
.catch((error)=>{
    console.log(error);
})
 
