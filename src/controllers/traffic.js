const mongoose = require("mongoose")
const Traffic = require("../models/traffic")

exports.saveTraffic = (req, res, next) => {
    console.log(req)
    try {
        const traffic = Traffic({
            _id: new mongoose.Types.ObjectId(),
            pos: req.body.pos,
            status: req.body.status,
            density: req.body.density,
            count: req.body.count
        })
        Traffic.findOne({ pos: req.body.pos }, "pos", (err, data) => {
            if (err)
                return res.status(400).json({
                    message: "failed to save data."
                })
            if (data) {
                return res.status(400).json({
                    message: "Entry already exists."
                })
            } else
                traffic
                    .save()
                    .then(resp => {
                        res.status(201).json({
                            message: "Data received succesfully"
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: "Required parameter not supplied properly"
                        })
                    })
        })
    } catch (err) {
        res.status(400).json({
            message: "Required parameter not supplied properly",
            error: err
        })
    }
}

exports.getEveryLoc = (req, res, next) => {
    Traffic.find({})
        .exec()
        .then(trafficDetails => {
            if (trafficDetails.length > 0)
                return res.status(200).json(trafficDetails)

            return res.status(404).json({
                message: "No entries found"
            })
        })
}

exports.getLocByID = (req, res, next) => {
    Traffic.findById(req.params.id)
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
}

exports.getLocByName = (req, res, next) => {
    Traffic.findOne(
        { pos: req.params.place },
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
}

exports.updateTraffic = (req, res, next) => {
    Traffic.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, location) => {
            if (err)
                return res.status(500).json({
                    error: err
                })
            return res.status(200).json({
                message: "Data updated successfully.",
                data: location
            })
        }
    )
}

exports.deleteTrafficInfo = (req, res, next) => {
    Traffic.remove({ _id: req.params.id })
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
}
