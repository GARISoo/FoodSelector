const AccessTokenService = require('./AccessTokenService')
const User = require('../models/userModel')
const Restaurant = require('../models/restaurantModel')

class UsersService {
  static async loginUser({ userAgent, password, email }) {
    const user = await User.login(email, password)
    const roles = Object.values(user.roles).filter(Boolean)

    // create a token
    const { token } = await AccessTokenService.createToken({
      userId: user._id,
      userAgent,
    })

    return {
      email,
      token,
      userId: user._id,
      roles,
    }
  }

  static async createGuest({ userAgent }) {
    const randomNumber = Math.floor(Math.random() * 77777777)
    const email = `Guest${randomNumber}@guest.com`
    const fullName = `Guest${randomNumber}`
    const password = `Guest${randomNumber}!`
    const restaurantIds = await Restaurant.distinct('_id')
    const roles = {Guest: 777}
    const newGuest = await User.create({email, fullName, password, filteredRestaurants: restaurantIds, roles})

    // create a token
    const { token } = await AccessTokenService.createToken({
      userId: newGuest._id,
      userAgent,
    })

    return {
      email,
      token,
      userId: newGuest._id,
      roles,
    }
  }

  // logout user
  static async logoutUser(user) {
    const { token } = user

    await AccessTokenService.deleteToken(token)
  }
}

module.exports = UsersService
