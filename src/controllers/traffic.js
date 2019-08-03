const mongoose = require("mongoose")
const Traffic = require("../models/traffic")

const saveTraffic = async (req, res, next) => {
    try {
        const exists = await Traffic.findOne({ pos: req.body.pos })
        if (exists)
            return res.status(400).json({
                message: "Entry already exists."
            })

        const traffic = Traffic({
            _id: new mongoose.Types.ObjectId(),
            pos: req.body.pos,
            status: req.body.status,
            density: req.body.density,
            count: req.body.count
        })
        await traffic.save()
        return res.status(201).json({
            id: traffic._id
        })
    } catch (err) {
        res.status(400).json({
            error: "Required parameter not supplied properly"
        })
    }
}

const getEveryLoc = async (req, res, next) => {
    try {
        const data = await Traffic.find({})
        return data.length > 0
            ? res.status(200).json({
                  result: data
              })
            : res.status(404).json({
                  message: "No entries found"
              })
    } catch {
        return res.status(400).json({
            error: "Error occured!"
        })
    }
}

const getLocByID = async (req, res, next) => {
    try {
        return res.status(201).json({
            result: await Traffic.findById(req.params.id)
        })
    } catch {
        return res.status(400).json({
            error: "Resource fetch failed"
        })
    }
}

const getLocByName = async (req, res, next) => {
    try {
        const data = await Traffic.findOne({ pos: req.params.place })
        return res.status(201).json({
            result: data
        })
    } catch {
        return res.status(400).json({
            error: "Resource fetch failed"
        })
    }
}

const updateTraffic = async (req, res, next) => {
    try {
        const update = await Traffic.findByIdAndUpdate(_id, req.body)
        return res.status(201).json({
            result: update
        })
    } catch {
        return res.status(500).json({
            error: "Illegal parameters!!"
        })
    }
}

const deleteTrafficInfo = async (req, res, next) => {
    try {
        await Traffic.remove({ _id: req.params.id })
        return res.status(200).json({
            message: "Traffic entry deleted."
        })
    } catch {
        return res.status(500).json({
            error: "Error occured."
        })
    }
}

module.exports = {
    save: saveTraffic,
    getAll: getEveryLoc,
    getById: getLocByID,
    getByName: getLocByName,
    update: updateTraffic,
    delete: deleteTrafficInfo
}
