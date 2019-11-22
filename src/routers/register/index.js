const express = require("express")

const registerMiddleWares = require("../../middlewares/register")
const registerValidation = require("../../validator/register")
const validateBody = require("../../middlewares/utils/validateBody")

const router = express.Router()

router.post("/", registerValidation.registerValidationRule, validateBody, registerMiddleWares.register)

module.exports = router
