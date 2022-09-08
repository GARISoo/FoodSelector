const mongoose = require('mongoose')
const User = require('./userModel');
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: [String],
    required: true
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
