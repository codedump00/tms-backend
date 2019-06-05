const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Traffic = require("../models/traffic")

router.get("/", (req, res, next) => {
    Traffic.find()
        .exec()
        .then(trafficDetails => {
            // if (trafficDetails.length > 0) {
            res.status(200).json(trafficDetails)
            // } else {
            //     res.status(404).json({
            //         message: "No entries found"
            //     })
            // }
        })
})

router.get("/:id/", (req, res, next) => {
    let id = req.params.id
    console.log(id)
    Traffic.findById(id)
        .exec()
        .then(result => {
            res.status(201).json({
                message: "Data successfully fetched",
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "Resource fetch failed"
            })
        })
})

router.get("/location/:place/", (req, res, next) => {
    let place = req.params.place
    Traffic.findOne(
        { pos: `${place}` },
        "status density count",
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
        }
    ).exec()
})

router.post("/", (req, res, next) => {
    try {
        const traffic = Traffic({
            _id: new mongoose.Types.ObjectId(),
            pos: req.body.pos,
            status: req.body.status,
            density: req.body.density,
            count: req.body.count
        })
        traffic
            .save()
            .then(resp => {
                res.status(201).json({
                    message: "Data received succesfully",
                    response: resp
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: "Required parameter not supplied properly"
                })
            })
    } catch {
        res.status(200).json({
            message: "Location unavailable ...",
            data: req.body
        })
    }
})

router.patch("/:id", (req, res, next) => {
    const id = req.params.id
    const updateData = {}
    for (const data of req.body) {
        updateData[data.dataName] = data.value
    }
    Traffic.update({ _id: id }, { $set: { updateData } })
        .exec()
        .then(res => {
            res.status(200).json(res)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id
    Traffic.remove({ _id: id })
        .exec()
        .then(res => {
            res.status(200).json({
                message: "deleted",
                response: res
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error occured.",
                error: err
            })
        })
})

module.exports = router
