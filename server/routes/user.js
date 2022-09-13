const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const UsersService = require("../services/UsersService")
const User = require('../models/userModel')

const router = express.Router()

// login route
router.post("/login", async (req, res) => {
  const userAgent = req.headers['user-agent'] || 'local placeholder';
  const { email, password } = req.body

  try {
    const response = await UsersService.loginUser({email, password, userAgent})

    res.cookie('accessCookie', `Bearer ${response.token}`, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
    })

    res.send({
      data: response,
      status: 'success',
      message: 'User logged in successfully',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

// login route
router.post("/guest", async (req, res) => {
  const userAgent = req.headers['user-agent'] || 'local placeholder';

  try {
    const guest = await UsersService.createGuest({userAgent})

    res.cookie('accessCookie', `Bearer ${guest.token}`, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
    })

    res.send({
      data: guest,
      status: 'success',
      message: 'User logged in successfully',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

// register a user route
router.post('/signup', async (req, res) => {
  const { email, password, fullName } = req.body;
  
  try {
    await User.signup({ email, fullName, password })

    res.send({
      data: email,
      status: 'success',
      message: `${email} created`,
    });
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    });
  }
})

// require auth for all season routes
router.use(requireAuth)

// logout route
router.post("/logout", async (req, res) => {
 const { user } = req

  try {
    await UsersService.logoutUser(user)
    
    res.clearCookie('accessCookie')

    res.send({
      data: null,
      status: 'success',
      message: 'User logged out successfully',
    })
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    })
  }
})

router.get('/is-authorized', (req, res) => {
  const { user } = req;

  try {
    res.send({
      data: user,
      status: 'success',
      message: 'Authorized!',
    });
  } catch (error) {
    res.send({
      data: null,
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = router
