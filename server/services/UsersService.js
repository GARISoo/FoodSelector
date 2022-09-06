const AccessTokenService = require('./AccessTokenService')
const User = require('../models/userModel')

class UsersService {
  static async loginUser({ userAgent, password, email }) {
    const user = await User.login(email, password)
    const roles = Object.values(user.roles).filter(Boolean)
    const { lastFiveGames, avatar, points } = user

    // create a token
    const { token } = await AccessTokenService.createToken({
      userId: user._id,
      userAgent,
    })

    return {
      email,
      token,
      userId: user._id,
      avatar,
      lastFiveGames,
      roles,
      points,
    }
  }

  // logout user
  static async logoutUser(user) {
    const { token } = user
    await AccessTokenService.deleteToken(token)
  }

  // delete user
  static async deleteUser({ email }) {
    await User.delete(email)
  }

  // get all users
  static async getAllUsers() {
    const users = await User.find({})

    if (!users) {
      throw new Error("No users found")
    }

    users.sort((a, b) => b.points - a.points)

    return { users }
  }

  // change password
  static async changeUserPassword({ email, newPass }) {
    await User.changePass(email, newPass)
  }
}

module.exports = UsersService
