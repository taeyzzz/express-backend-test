const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require("jsonwebtoken")

const models = require("../../../db/models")
const Users = models.Users

exports.index = async (req, res, next) => {
  try {
    const results = await Users.findAll({ include: "cards" })
    res.json({
      data: results
    })
  }
  catch (err) {
    next(err)
  }
}

exports.show = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await Users.findOne({
      where: {
        id
      }
    })
    if(!result){
      const err = new Error("Not Found")
      err.statusCode = 404
      throw err
    }
    else{
      res.json({
        data: result
      })
    }
  }
  catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  const { firstName, lastName } = req.body
  const { id } = req.params
  try {
    const selectedUser = await Users.findOne({
      where: {
        id
      }
    })
    if(!selectedUser){
      const err = new Error("Not Found")
      err.statusCode = 400
      throw err
    }
    else{
      const updated = await selectedUser.update({
        firstName, lastName
      })
      res.json({
        data: updated
      })
    }
  }
  catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  const { id } = req.params
  try {
    const selectedUser = await Users.findOne({
      where: {
        id
      }
    })
    if(!selectedUser){
      const err = new Error("Not Found")
      err.statusCode = 400
      throw err
    }
    else{
      await selectedUser.destroy()
      res.status(204).send()
    }
  }
  catch (err) {
    next(err)
  }
}

exports.register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    const results = await Users.create({
      email,
      passwordHash,
      firstName,
      lastName
    })
    res.json({
      data: results
    })
  }
  catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const result = await Users.findOne({
      where: {
        email
      }
    })
    if(!result){
      const err = new Error("Email or Password is not valid.")
      err.statusCode = 401
      throw err
    }
    else{
      const user = result.get()
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
      if(isPasswordValid){
        const token = await jwt.sign(user, process.env.JWT_PRIVATE_KEY);
        const expired = moment().add(1, "days").toDate()
        res.cookie("token", token, { expires: expired, httpOnly: true })
        res.json({
          data: user
        })
      }
      else {
        const err = new Error("Email or Password is not valid.")
        err.statusCode = 401
        throw err
      }
    }
  }
  catch (err) {
    next(err)
  }
}

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token")
    res.status(204).send()
  }
  catch (err) {
    next(err)
  }
}

exports.getSession = async (req, res, next) => {
  const token = req.cookies.token
  try {
    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    const user = await Users.findOne({
      where: {
        id: decoded.id
      }
    })
    res.json({
      message: user
    })
  }
  catch (err) {
    next(err)
  }
}

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if(!token) {
      const err = new Error("Unauthorized")
      err.statusCode = 401
      throw err
    }
    else{
      const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
      const result = await Users.findOne({
        where: {
          id: decoded.id
        }
      })
      const user = result.get()
      req.currentUser = user
      next()
    }
  }
  catch (err) {
    next(err)
  }
}
