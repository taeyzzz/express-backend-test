const bcrypt = require('bcrypt');
const express = require("express")
const router = express.Router()
const models = require('../../db/models');
const Users = models.Users;

router.get("/", async (req, res) => {
  try {
    const results = await Users.findAll({ include: "cards"})
    res.json({
      data: results
    })
  }
  catch (err) {
    res.status(400).json({
      error: err
    })
  }
})

router.post("/register", async (req, res) => {
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
    console.log(err);
    res.status(400).json({
      error: err
    })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await Users.findOne({
      where: {
        email
      }
    })
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if(isPasswordValid){
      res.json({
        data: user
      })
    }
    else {
      throw new Error("Email or Password is not valid.")
    }
  }
  catch (err) {
    console.log(err);
    res.status(400).json({
      error: err
    })
  }
})


module.exports = router
