const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Restaurant = require('./restaurantModel')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 1000,
    },
    Admin: Number,
    Guest: Number,
  },
  filteredRestaurants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Restaurant"
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
})

// static signup method
userSchema.statics.signup = async function ({email, fullName, password}) {
  // validation
  if (!email || !password || !fullName) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  fullName.toUpperCase()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const restaurantIds = await Restaurant.distinct('_id')
  const user = await this.create({ email, password: hash, fullName, filteredRestaurants: restaurantIds })

  return user
}

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// static promote method
userSchema.statics.promote = async function (email) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }

  if (user.roles.Admin) {
    throw Error('This user is already an admin')
  }

  user.roles = { User: 1000, Admin: 2000 }
  await user.save()

  return user
}

// static demote method
userSchema.statics.demote = async function (email) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Can't find user with this email")
  }

  // Check if user is an admin
  if (!user.roles.Admin) {
    throw Error('This user is not an admin')
  }

  user.roles = { User: 1000 }
  await user.save()

  return user
}

// static delete method
userSchema.statics.delete = async function (email) {
  const user = await this.findOneAndDelete({ email })

  if (!user) {
    throw Error("Can't find user with this email")
  }
}

userSchema.statics.single = async function (email) {
  const user = await this.findOne({ email })
  
  if (!user) {
    throw Error("Can't find user with this email")
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
