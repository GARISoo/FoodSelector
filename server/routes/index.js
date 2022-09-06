const express = require('express')
const router = express.Router();
const users = require("./user");
const auth = require("./auth");
const requireAuth = require("../middleware/requireAuth")

router
  .use("/user", users)
  // .use("/user", requireAuth, users)
  .use('/auth', auth)

module.exports = router;