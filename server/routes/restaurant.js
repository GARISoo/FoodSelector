const express = require("express")
const Restaurant = require('../models/restaurantModel')
const RestaurantService = require("../services/RestaurantService")
const requireAuth = require("../middleware/requireAuth")
const router = express.Router()

// require auth for all season routes
router.use(requireAuth)

// get random restaurant
router.get("/random/:activeFilters", async (req, res) => {
  const { activeFilters } = req.params
  const { _id } = req.user;

  const filtersArr = activeFilters.split(',')

  try {
    const restaurant = await RestaurantService.getRandom({ userId: _id, filtersArr })

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

// get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})

    res.send({
      data: restaurants,
      status: 'success',
      message: 'Got all restaurants!',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

// add new restaurant
router.post("/", async (req, res) => {
  const { restaurantName, selectedCategories } = req.body;
  const { _id } = req.user;

  try {
    await Restaurant.create({name: restaurantName, category: selectedCategories, postedBy: _id})

    res.send({
      data: null,
      status: 'success',
      message: 'Done!',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: 'Something went wrong!',
    })
  }
})

// get all user restaurants
router.get("/user", async (req, res) => {
  const { _id } = req.user;

  try {
    const restaurants = await RestaurantService.getUserRestaurants({ userId: _id })

    res.send({
      data: restaurants,
      status: 'success',
      message: 'Got all restaurants!',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

// get all user restaurants
router.patch("/toggle", async (req, res) => {
  const { _id } = req.user;
  const { restaurantId } = req.body;

  try {
    await RestaurantService.toggleUserRestaurants({ userId: _id, restaurantId })

    res.send({
      data: null,
      status: 'success',
      message: 'Got all restaurants!',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

// toggle all use restaurants 
router.patch("/toggleAll", async (req, res) => {
  const { _id } = req.user;

  try {
    const restaurants = await RestaurantService.toggleAllUserRestaurants({ userId: _id })
    console.log(restaurants)
    res.send({
      data: restaurants,
      status: 'success',
      message: 'Toggled all restaurants!',
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
