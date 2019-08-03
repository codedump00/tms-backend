const express = require("express")
const AuthMiddleWare = require("../middlewares/auth")

const router = express.Router()

const controller = require("../controllers/user")

router.get("/name/:name/", AuthMiddleWare, controller.findByUName)
router.get("/", AuthMiddleWare, controller.findByID)
router.get("/location/", AuthMiddleWare, controller.getLocation)

router.post("/signup/", controller.signup)
router.post("/login/", controller.login)

router.put("/location/", AuthMiddleWare, controller.setLocation)
router.put("/", AuthMiddleWare, controller.patchByID)

router.delete("/", AuthMiddleWare, controller.delete)

module.exports = router
