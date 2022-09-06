const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const verifyRoles = require("../middleware/verifyRoles")
const ROLE_LIST = require("../config/rolesList")
const UsersService = require("../services/UsersService")
const User = require('../models/userModel')

const router = express.Router()

// login route
router.post("/login", async (req, res) => {
  const userAgent = req.headers['user-agent'] || 'local placeholder';
  const { email, password } = req.body

  try {
    const response = await UsersService.loginUser({ email, password, userAgent })

    res.cookie('accessCookie', `Bearer ${response.token}`, {
      httpOnly: true,
      sameSite: 'strict',
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

// require auth for all workout routes
router.use(requireAuth)

router.get('/is-authorized', (req, res) => {
  const { _id } = req.user;

  try {
    res.send({
      data: { _id },
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

// give admin access route
router.post("/promote/:email", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email } = req.params;

  try {
    await UsersService.promoteUser({ email })

    res.send({
      data: email,
      message: `${email} promoted`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// remove admin access route
router.post("/demote/:email", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email } = req.params
  const { _id } = req.user

  try {
    await UsersService.demoteUser({ email, _id })

    res.send({
      data: email,
      message: `${email} demoted`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

// delete user route
router.delete("/delete/:email", verifyRoles(ROLE_LIST.Admin), async (req, res) => {
  const { email } = req.params

  try {
    await UsersService.deleteUser({ email })

    res.send({
      data: email,
      message: `${email} deleted`,
      status: "success",
    })
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: "error",
    })
  }
})

module.exports = router
