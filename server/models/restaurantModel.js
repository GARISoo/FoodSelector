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
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
})

restaurantSchema.statics.getRandom = async function() {
  const restaurants = await this.find({})
  const randomIndex = Math.floor(Math.random() * restaurants.length)
  const randomRestaurant = restaurants[randomIndex]

  if (!restaurants.length) {
    throw Error("No restaurants found")
  }

  return randomRestaurant
}

module.exports = mongoose.model('Restaurant', restaurantSchema)
