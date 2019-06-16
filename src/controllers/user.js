const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.signUpController = (req, res, next) => {
    if (req.body.email && req.body.name && req.body.password) {
        try {
            User.find({ email: req.body.email })
                .exec()
                .then(user => {
                    if (user.length > 0)
                        return res.status(409).json({
                            message: "Account creation failed. User exists."
                        })

                    const hash = bcrypt.hash(
                        req.body.password,
                        10,
                        (err, hash) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                })
                            } else {
                                const user = User({
                                    _id: new mongoose.Types.ObjectId(),
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: hash
                                })
                                user.save()
                                    .then(resp => {
                                        res.status(201).json({
                                            message: "User Created"
                                        })
                                    })
                                    .catch(err => {
                                        res.status(400).json({
                                            message:
                                                "Required parameter not supplied properly"
                                        })
                                    })
                            }
                        }
                    )
                })
        } catch {
            res.status(200).json({
                message: "Sign up failed!",
                data: req.body
            })
        }
    } else {
        res.status(400).json({
            message: "Required parameter not supplied properly"
        })
    }
}

exports.loginController = (req, res, next) => {
    console.log(1)
    User.findOne(
        { email: req.body.email },
        "name password _id",
        (err, data) => {
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
                                token: tok,
                                id: data._id
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
        }
    )
        .exec()
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            })
        })
}

exports.findByID = (req, res, next) => {
    User.findById(req.params.id, (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send({
            name: data.name,
            email: data.email,
            location: data.location
        })
    })
}

exports.findByUName = (req, res, next) => {
    let userName = req.params.userName
    User.findOne({ name: `${userName}` }, "email name", (err, data) => {
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
}

exports.patchByID = (req, res, next) => {
    if (req.body.length > 0)
        User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, location) => {
                if (err) return res.status(500).send(err)
                return res.status(200).json({
                    message: "Profile updated successfully."
                })
            }
        )
}

exports.deleteUser = (req, res, next) => {
    User.remove({
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

exports.getLocation = (req, res, next) => {
    User.findOne({ _id: `${req.params.id}` }, "location", (err, data) => {
        if (data) {
            res.status(201).json({
                message: "Location successfully fetched",
                data: data
            })
            return
        }
        res.status(400).json({
            message: "Resource fetch failed",
            error: err
        })
    }).exec()
}

exports.setLocation = (req, res, next) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, location) => {
            if (err) return res.status(500).send(err)
            return res.status(200).json({
                message: "location updated successfully."
            })
        }
    )
}
