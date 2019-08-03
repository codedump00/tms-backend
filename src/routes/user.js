const express = require("express")
const AuthMiddleWare = require("../middlewares/auth")

const router = express.Router()

const controller = require("../controllers/user")

router.get("/name/:userName/", AuthMiddleWare, controller.findByUName)
router.get("/:id/", AuthMiddleWare, controller.findByID)
router.get("/:id/location/", AuthMiddleWare, controller.getLocation)

router.post("/signup/", controller.signup)
router.post("/login/", controller.login)

router.put("/:id/location/", AuthMiddleWare, controller.setLocation)
router.put("/:userID/", AuthMiddleWare, controller.patchByID)

router.delete("/:userID/", AuthMiddleWare, controller.delete)

module.exports = router
