import express, { IRouter } from "express"

import registerMiddleWares from "../../middlewares/register"
import registerValidation from "../../validator/register"
import validateBody from "../../middlewares/utils/validateBody"

const router: IRouter = express.Router()

router.post("/", registerValidation.registerValidationRule, validateBody, registerMiddleWares.register)

export default router
