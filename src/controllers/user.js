const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.signup = async (req, res, next) => {
    try {
        const stored = await User.find({ email: req.body.email })
        if (stored.length > 0)
            return res.status(409).json({
                message: "Account creation failed. User exists."
            })

        const hash = await bcrypt.hash(req.body.password, 10)
        const user = User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        await user.save()
        return res.status(201).json({
            message: "User Created"
        })
    } catch (err) {
        res.status(400).json({
            error: "Sign up failed! Parameters not supplied properly."
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const data = await User.findOne(
            { email: req.body.email },
            "name password _id"
        )
        const ok = await bcrypt.compare(req.body.password, data.password)
        if (ok) {
            const tok = jwt.sign(
                {
                    email: data.email,
                    userId: data._id,
                    type: data.type
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            )
            return res.status(200).json({
                token: tok,
                id: data._id
            })
        }
    } catch {
        return res.status(400).json({
            error: "Error logging in!!!"
        })
    }
}

exports.findByID = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        return res.status(200).send({
            result: {
                name: user.name,
                email: user.email,
                location: user.location
            }
        })
    } catch {
        return res.status(500).json({
            error: "Illegal parameters!!"
        })
    }
}

exports.findByUName = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.params.name })
        return res.status(201).json({
            result: {
                name: user.name,
                email: user.email
            }
        })
    } catch {
        return res.status(400).json({
            error: "Illegal parameters!!"
        })
    }
}

exports.patchByID = async (req, res, next) => {
    try {
        await User.updateOne({ _id: req.user.userId }, req.body)
        return res.status(200).json({
            message: "Profile updated successfully."
        })
    } catch {
        return res.status(500).json({
            error: "Error occured!!"
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await User.deleteOne({ _id: req.user.userId })
        return res.status(200).json({
            message: "User deleted"
        })
    } catch {
        return res.status(400).json({
            error: "Illegal action!!"
        })
    }
}

exports.getLocation = async (req, res, next) => {
    try {
        const location = await User.findOne(
            { _id: req.user.userId },
            "location"
        )
        return res.status(200).json({
            result: location
        })
    } catch {
        return res.status(400).json({
            error: "Resource fetch failed"
        })
    }
}

exports.setLocation = async (req, res, next) => {
    try {
        const update = await User.updateOne(
            { _id: req.user.userId },
            {
                location: req.body.location
            }
        )
        return res.status(200).json({
            message: "location updated successfully."
        })
    } catch {
        return res.status(500).json({
            error: "Error ocurred!"
        })
    }
}
