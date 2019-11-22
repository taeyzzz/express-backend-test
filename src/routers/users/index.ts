import express, { IRouter } from "express"

import usersMiddleWares from "../../middlewares/users"

const router: IRouter = express.Router()

router.get("/", usersMiddleWares.index)
router.get("/:id", usersMiddleWares.show)
router.get("/detail/session", usersMiddleWares.getSession)
router.patch("/:id", usersMiddleWares.update)
router.delete("/:id", usersMiddleWares._delete)


export default router
