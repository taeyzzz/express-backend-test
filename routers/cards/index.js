const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    message: "TODO list Cards"
  })
})

module.exports = router
