const express = require("express")
const auth = require("../middlewares/auth")

const router = express.Router()

const controller = require("../controllers/user")

router.get("/name/:name/", auth.userAuth, controller.findByUName)
router.get("/", auth.userAuth, controller.findByID)
router.get("/location/", auth.userAuth, controller.getLocation)

router.post("/signup/", controller.signup)
router.post("/login/", controller.login)

router.put("/location/", auth.userAuth, controller.setLocation)
router.put("/", auth.userAuth, controller.patchByID)

router.delete("/", auth.userAuth, controller.delete)

module.exports = router
