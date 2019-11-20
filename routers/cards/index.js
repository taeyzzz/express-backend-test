const express = require("express")
const router = express.Router()
const models = require('../../db/models');
const Cards = models.Cards;

router.get("/", async (req, res) => {
  try {
    const results = await Cards.findAll({ include: "user"})
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

router.post("/", async (req, res) => {
  const { name, status, content, category, userId } = req.body
  try {
    const results = await Cards.create({
      name, status, content, category, userId
    })
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
