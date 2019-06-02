const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const ConsumerSchema = require("../models/consumerModel")

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "You have requested consumer information."
  })
})

router.get("/:id/", (req, res, next) => {
  let id = req.params.id
  ConsumerSchema.findById(id)
    .exec()
    .then(result => {
      if (pwd === data.password) {
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
  ConsumerSchema.findOne(
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
  ).exec()
})

router.post("/user/login/", (req, res, next) => {
  let userName = req.body.userName
  ConsumerSchema.findOne(
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
  ).exec()
})

router.post("/", (req, res, next) => {
  try {
    console.log(req.body)
    const consumer = ConsumerSchema({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    consumer
      .save()
      .then(resp => {
        res.status(201).json({
          message: "Data received succesfully",
          response: resp._id
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

router.patch("/:userID", (req, res, next) => {
  res.status(200).json({
    message: "User info updated",
    id: req.params.userID
  })
})

router.delete("/:userID", (req, res, next) => {
  res.status(200).json({
    message: "user info deleted"
  })
})

module.exports = router
