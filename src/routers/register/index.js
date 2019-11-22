const express = require("express")

const registerMiddleWares = require("../../middlewares/register")

const router = express.Router()

router.post("/", registerMiddleWares.register)

module.exports = router
