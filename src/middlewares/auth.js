const jwt = require("jsonwebtoken")
const Traffic = require("../models/traffic")

const UserVerification = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.get("x-access-token"),
            process.env.JWT_SECRET
        )
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({
            error: "Auth failed"
        })
    }
}

const TrafficVerification = async (req, res, next) => {
    try {
        const id = req.get("x-access-id")
        req.trafficId = id
        next()
    } catch {
        return res.status(401).json({
            error: "Verification failed"
        })
    }
}

module.exports = {
    userAuth: UserVerification,
    trafficAuth: TrafficVerification
}
