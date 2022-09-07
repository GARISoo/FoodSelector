const users = require('./users')
const restaurantSeed = require('./restaurants')

const seed = async () => {
    await users()
    await restaurantSeed()
}

module.exports = seed