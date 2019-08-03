const express = require("express")
const router = express.Router()

const controller = require("../controllers/traffic")

router.get("/", controller.getAll)
router.get("/:id/", controller.getById)
router.get("/location/:place/", controller.getByName)

router.post("/", controller.save)

router.put("/:id/", controller.update)

router.delete("/:id/", controller.delete)

module.exports = router
