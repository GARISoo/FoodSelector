const AccessTokenService = require('./AccessTokenService')
const User = require('../models/userModel')
const Restaurant = require('../models/userModel')

class RestaurantService {
  static async getRandom({ userId, filtersArr }) {
    const { filteredRestaurants } = await User.findOne({ _id: userId }).populate('filteredRestaurants')

    let response

    if (filtersArr.includes('All')) {
      response = filteredRestaurants
    } else {
      response = filteredRestaurants.filter(({ category }) => category.some((el) => filtersArr.includes(el)))
    }

    const randomIndex = Math.floor(Math.random() * response.length)
    const randomRestaurant = response[randomIndex]

    if (!response.length) {
      throw Error("No restaurants found")
    }

    return randomRestaurant
  }

  static async getUserRestaurants({ userId }) {
    const { filteredRestaurants } = await User.findOne({ _id: userId })

    return filteredRestaurants
  }

  static async toggleUserRestaurants({ userId, restaurantId }) {
    const user = await User.findOne({ _id: userId })
    
    const restaurantAlreadyChecked = user.filteredRestaurants.includes(restaurantId)

    console.log(restaurantAlreadyChecked)
    
    if (!restaurantAlreadyChecked) {
      user.filteredRestaurants = [...user.filteredRestaurants, restaurantId]
    } else {
      user.filteredRestaurants = user.filteredRestaurants.filter((el) => el.toString() !== restaurantId)
    }
    
    await user.save()

    return user
  }
}

module.exports = RestaurantService
