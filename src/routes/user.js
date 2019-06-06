const express = require("express")
const AuthMiddleWare = require('../middlewares/auth')

const router = express.Router()

const uController = require('../controllers/user')

router.get("/name/:userName/", uController.findByUName)
router.get("/:id/", uController.findByID)

router.post("/signup", uController.signUpController)
router.post("/login/", uController.loginController)

router.patch("/:userID/", uController.patchByID)

router.delete("/:userID/", uController.deleteUser)

module.exports = router
