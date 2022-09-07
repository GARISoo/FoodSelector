const express = require("express")
const Restaurant = require('../models/restaurantModel')

const router = express.Router()

// get random restaurant
router.get("/random", async (req, res) => {
  try {
    const restaurant = await Restaurant.getRandom()

    res.send({
      data: restaurant,
      status: 'success',
      message: 'Random restaurant been found!',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

module.exports = router
