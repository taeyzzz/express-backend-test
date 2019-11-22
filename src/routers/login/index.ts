import express, { IRouter } from "express"

import loginMiddleWares from "../../middlewares/login"

const router: IRouter = express.Router()

router.post("/", loginMiddleWares.login)

export default router
