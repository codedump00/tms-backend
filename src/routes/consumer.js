const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const router = express.Router()
const userSchema = require("../models/user")

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "You have requested consumer information."
    })
})

router.get("/:id/", (req, res, next) => {
    let id = req.params.id
    userSchema
        .findById(id)
        .exec()
        .then(result => {
            if (result.password === req.params.password) {
                let data = ({ _id, name, email, token, location } = result)
                res.status(201).json({
                    message: "Data successfully fetched",
                    data: data
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: "Resource fetch failed"
            })
        })
})

router.get("/name/:userName/", (req, res, next) => {
    let userName = req.params.userName
    userSchema
        .findOne(
            { name: `${userName}` },
            "email token location",
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
        )
        .exec()
})

router.post("/login/", (req, res, next) => {
    let userName = req.body.name
    userSchema
        .findOne(
            { name: `${userName}` },
            "email token location",
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
        )
        .exec()
})

router.post("/signup", (req, res, next) => {
    try {
        userSchema
            .find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length > 0)
                    return res.status(409).json({
                        message: "email exists"
                    })
                const hash = bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = userSchema({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(resp => {
                                res.status(201).json({
                                    message: "User Created",
                                    response: resp._id
                                })
                            })
                            .catch(err => {
                                res.status(400).json({
                                    message:
                                        "Required parameter not supplied properly"
                                })
                            })
                    }
                })
            })
    } catch {
        res.status(200).json({
            message: "Location unavailable ...",
            data: req.body
        })
    }
})

router.patch("/:userID/", (req, res, next) => {
    res.status(200).json({
        message: "User info updated",
        id: req.params.userID
    })
})

router.delete("/:userID/", (req, res, next) => {
    res.status(200).json({
        message: "user info deleted"
    })
})

module.exports = router
