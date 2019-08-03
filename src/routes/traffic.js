const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth")
const controller = require("../controllers/traffic")

router.get("/all", controller.getAll)
router.get("/", auth.trafficAuth, controller.getById)
router.get("/location/:place/", controller.getByName)

router.post("/", controller.save)

router.put("/", auth.trafficAuth, controller.update)

router.delete("/", auth.trafficAuth, controller.delete)

module.exports = router
