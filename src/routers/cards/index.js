const express = require("express")

const cardsMiddleWares = require("../../middlewares/cards")

const router = express.Router()

router.get("/", cardsMiddleWares.index)
router.get("/:id", cardsMiddleWares.show)
router.post("/", cardsMiddleWares.create)
router.patch("/:id", cardsMiddleWares.update)
router.delete("/:id", cardsMiddleWares.delete)

module.exports = router
