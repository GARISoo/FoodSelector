const mongoose = require('mongoose')
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
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
