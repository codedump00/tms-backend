const express = require("express")
const AuthMiddleWare = require("../middlewares/auth")

const router = express.Router()

const uController = require("../controllers/user")

router.get("/name/:userName/", AuthMiddleWare, uController.findByUName)
router.get("/:id/", AuthMiddleWare, uController.findByID)
router.get("/location/", AuthMiddleWare)

router.post("/signup/", uController.signUpController)
router.post("/login/", uController.loginController)

router.patch("/:userID/", AuthMiddleWare, uController.patchByID)

router.delete("/:userID/", AuthMiddleWare, uController.deleteUser)

module.exports = router
