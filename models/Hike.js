
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema for hike created
const hikeSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  stars: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true    
  },
  title: {
    type: String,
    required: true
  },
  skillLevel:{
    type: String,
    required: true
  },
  time:{
    type: Number,
    required: true
  },
  hikeDistance:{
    type: Number,
    required: true
  },
  // //an array item for all fav hikes
  // favouriteHikes: [
  //   { type: Schema.ObjectId, ref: 'Hikes' }
  // ]
}, { timestamps: true })


// model
const hikeModel = mongoose.model('Hike', hikeSchema)

// export
module.exports = hikeModel

