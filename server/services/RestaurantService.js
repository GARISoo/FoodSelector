const Restaurant = require('../models/restaurantModel')
const User = require('../models/userModel')

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
    const {filteredRestaurants} = await User.findOne({ _id: userId })

    return filteredRestaurants
  }

  static async toggleUserRestaurants({ userId, restaurantId }) {
    const user = await User.findOne({ _id: userId })
    
    const restaurantAlreadyChecked = user.filteredRestaurants.includes(restaurantId)
    
    if (!restaurantAlreadyChecked) {
      user.filteredRestaurants = [...user.filteredRestaurants, restaurantId]
    } else {
      user.filteredRestaurants = user.filteredRestaurants.filter((el) => el.toString() !== restaurantId)
    }
    
    await user.save()

    return user
  }

    static async toggleAllUserRestaurants({ userId }) {
    const user = await User.findOne({ _id: userId })

    const anyRestaurantAlreadyChecked = user.filteredRestaurants.length

    if (!anyRestaurantAlreadyChecked) {
      const restaurantIds = await Restaurant.distinct('_id')
      user.filteredRestaurants = restaurantIds
    } else {
      user.filteredRestaurants = []
    }

    await user.save()

    return user.filteredRestaurants
  }
}

module.exports = RestaurantService
