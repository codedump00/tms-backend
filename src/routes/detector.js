
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const TrafficSchema = require('../models/trafficModel')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"You have requested traffic density..."
    })
})

router.get('/:id/', (req, res, next) => {
    let id = req.params.id
    console.log(id)
    TrafficSchema.findById(id).exec().then(result => {
        res.status(201).json({
            message: "Data successfully fetched",
            data: result
        })
    }).catch(err => {
        res.status(400).json({
            message: "Resource fetch failed"
        })
    })
})

router.get('/location/:place/', (req, res, next) => {
    let place = req.params.place
    TrafficSchema.findOne({'pos':`${place}`}, 'status density count',
        (err, data) => {
            if (data) {
                res.status(201).json({
                    message: "Data successfully fetched",
                    data: data
                })
                return
            }
            res.status(400).json({
                message: "Resource fetch failed",
                error: err
            })
        }).exec()
})

router.post('/', (req, res, next) => {
    try{
        const traffic = TrafficSchema({
            _id: new mongoose.Types.ObjectId(),
            pos: req.body.pos,
            status: req.body.status,
            density: req.body.density,
            count: req.body.count
        })
        traffic.save().then(resp => {
            res.status(201).json({
                message: "Data received succesfully",
                response: resp
            })
        }).catch(err => {
            res.status(400).json({
                message: "Required parameter not supplied properly",
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