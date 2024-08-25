const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = new Schema({
    
    title: String,
  description: String,
  url: String,
  publishedAt: Date,

}, { collection: 'articles', timestamps: true});


module.exports = mongoose.model('Article',articleSchema)