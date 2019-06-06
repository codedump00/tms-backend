const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userSchema = require("../models/user")
const bcrypt = require("bcrypt")

exports.signUpController = (req, res, next) => {
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
}

exports.loginController = (req, res, next) => {
    console.log(1)
    userSchema
        .findOne({ email: req.body.email }, "name password", (err, data) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            if (data) {
                bcrypt.compare(
                    req.body.password,
                    data.password,
                    (err, result) => {
                        if (err)
                            return res.status(401).json({
                                message: "Auth failed"
                            })
                        if (result) {
                            const tok = jwt.sign(
                                {
                                    email: data.email,
                                    userId: data._id
                                },
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "1d"
                                }
                            )
                            return res.status(200).json({
                                message: "Auth successful",
                                token: tok
                            })
                        } else {
                            return res.status(401).json({
                                message: "Auth failed"
                            })
                        }
                    }
                )
            } else {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
        })
        .exec()
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            })
        })
}

exports.findByID = (req, res, next) => {
    userSchema
        .findById(req.params.id)
        .exec()
        .then(result => {
            return res.status(201).json({
                message: "Data successfully fetched",
                data: result
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: "Resource fetch failed"
            })
        })
}

exports.findByUName = (req, res, next) => {
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
}

exports.patchByID = (req, res, next) => {
    res.status(200).json({
        message: "User info updated",
        id: req.params.userID
    })
}

exports.deleteUser = (req, res, next) => {
    userSchema
        .remove({
            _id: req.params.userID
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "Required parameter not supplied properly",
                error: err
            })
        })
}
