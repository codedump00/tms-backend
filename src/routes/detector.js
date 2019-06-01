
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const TrafficSchema = require('../models/detection')

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

router.get('/:location/', (req, res, next) => {
    let location = req.params.location
    try{
        res.status(200).json({
            message: `${location} chwok traffic info`,
            data: "coming soon ..."
        })
    }catch{
        res.status(200).json({
            message: "Location unavailable ...",
            location: location
        })
    }
})

router.post('/:location/', (req, res, next) => {
    try{
        const traffic = TrafficSchema({
            _id: new mongoose.Types.ObjectId(),
            pos: req.body.pos,
            status: req.body.status,
            density: req.body.density,
            count: req.body.count
        })
        traffic.save().then(res => {
            res.status(201).json({
                message: "Data received succesfully..",
                response: res
            })
        }).catch(err => {
            res.status(400).json({
                message: "Failed ...",
                error: err
            })
        })
    }catch{
        res.status(200).json({
            message: "Location unavailable ...",
            data: req.body
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