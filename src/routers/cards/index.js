const express = require("express")

const cardsMiddleWares = require("../../middlewares/cards")
const cardValidation = require("../../validator/cards")
const validateBody = require("../../middlewares/utils/validateBody")

const router = express.Router()

router.get("/", cardsMiddleWares.index)
router.get("/:id", cardsMiddleWares.show)
router.post("/", cardValidation.createCardValidationRule, validateBody, cardsMiddleWares.create)
router.patch("/:id", cardsMiddleWares.update)
router.delete("/:id", cardsMiddleWares.delete)

module.exports = router
