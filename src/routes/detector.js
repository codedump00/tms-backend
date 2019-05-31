
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"You have requested traffic density..."
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message:"You have requested traffic density via post..."
    })
})

router.get('/:location', (req, res, next) => {
    const location = req.params.location
    if(location === "ban"){
        res.status(200).json({
            message: "Baneshwor chwok traffic info",
            location: location
        })
    }else {
        res.status(200).json({
            message: "Location unavailable ...",
            location: location
        })
    }
})

router.patch('/:location', (req, res, next) => {
    res.status(200).json({
        message: "Baneshwor chwok traffic info updated",
        location: location
    })
})

router.delete('/:location', (req, res, next) => {
    res.status(200).json({
        message: "Baneshwor chwok traffic info deleted",
        location: location
    })
})

module.exports = router