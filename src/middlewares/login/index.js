const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require("jsonwebtoken")

const models = require("../../db/models")
const Users = models.Users

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
    const user = result.get()
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if(!isPasswordValid){
      const err = new Error("Email or Password is not valid.")
      err.statusCode = 401
      throw err
    }
    const token = await jwt.sign(user, process.env.JWT_PRIVATE_KEY);
    const expired = moment().add(1, "days").toDate()
    res.cookie("token", token, { expires: expired, httpOnly: true })
    res.json({
      data: user
    })
  }
  catch (err) {
    next(err)
  }
}
