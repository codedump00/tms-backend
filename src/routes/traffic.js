const express = require("express")
const router = express.Router()

const tController = require("../controllers/traffic")

router.get("/", tController.getEveryLoc)
router.get("/:id/", tController.getLocByID)
router.get("/location/:place/", tController.getLocByName)

router.post("/", tController.saveTraffic)

router.put("/:id/", tController.updateTraffic)

router.delete("/:id/", tController.deleteTrafficInfo)

module.exports = router
