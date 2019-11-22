const express = require("express")

const loginMiddleWares = require("../../middlewares/login")

const router = express.Router()

router.post("/", loginMiddleWares.login)

module.exports = router
