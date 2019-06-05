const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const express = require("express")
const morgan = require("morgan")
const app = express()

const detectorRoute = require("./routes/detector")
const consumerRoute = require("./routes/consumer")
const PORT = process.env.PORT || 3000
const DATABASE_URI  = process.env.DATABASE_URI
/*Database connection*/

mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true })
  .catch(err => console.log(err))
/*------------------*/

/*Logging for dev environment*/

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/*---------------------------*/

/*Route Declaration*/

app.use("/user", consumerRoute)
app.use("/traffic", detectorRoute)
/*------------------*/

/*Static file serving */

app.use(express.static("public"))
/*------------------*/

/*Error Handlers*//

app.use((req, res, next) => {
  let err = new Error("Query not found")
  err.status = 404
  next(err)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})
/*----------------*/

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`)
})

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers',
//     'Origin, X-Requested-With,Content-Type, Accept, Authorization')
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET')
//         return res.status(200).json({})
//     }
// })
