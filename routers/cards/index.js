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

module.exports = router
