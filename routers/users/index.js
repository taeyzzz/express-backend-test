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

module.exports = router
