const express = require("express")

const usersMiddleWares = require("../../middlewares/users")

const router = express.Router()

router.get("/", usersMiddleWares.index)
router.get("/:id", usersMiddleWares.show)
router.get("/detail/session", usersMiddleWares.getSession)
router.patch("/:id", usersMiddleWares.update)
router.delete("/:id", usersMiddleWares.delete)



module.exports = router
