import express, { IRouter} from "express"

import cardsMiddleWares from "../../middlewares/cards"
import cardValidation from "../../validator/cards"
import validateBody from "../../middlewares/utils/validateBody"

const router: IRouter = express.Router()

router.get("/", cardsMiddleWares.index)
router.get("/:id", cardsMiddleWares.show)
router.post("/", cardValidation.createCardValidationRule, validateBody, cardsMiddleWares.create)
router.patch("/:id", cardsMiddleWares.update)
router.delete("/:id", cardsMiddleWares._delete)

export default router
