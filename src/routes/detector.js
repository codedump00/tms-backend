
const express = require('express')
const router = express.Router()

router.get('/density', (req, res) => {
    res.send("You have requested traffic density...")
})

module.exports = router