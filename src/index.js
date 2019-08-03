const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const express = require("express")
const helmet = require("helmet")

const traffic = require("./routes/traffic")
const user = require("./routes/user")

const app = express()
const PORT = process.env.PORT || 3000
const DATABASE_URI = process.env.DATABASE_URI

/*Database connection*/
mongoose
    .connect(DATABASE_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to mongoDB Atlas."))
    .catch(err => console.log(err))

/*Logging for dev environment*/
if (PORT === 3000) {
    const morgan = require("morgan")
    app.use(morgan("dev"))
}

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/*Static file serving */
app.use(express.static("public"))

/*Route Declaration*/
app.use("/user", user)
app.use("/traffic", traffic)

/*Error Handlers*/
app.use((req, res, next) => {
    const err = new Error("Query not found")
    err.status = 404
    next(err)
})
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`)
})
