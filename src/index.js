const mongoose = require("mongoose")
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const traffic = require("./routes/traffic")
const user = require("./routes/user")

const app = express()
const PORT = process.env.PORT || 3000
/*Logging for dev environment*/
if (!process.env.PORT) {
    const morgan = require("morgan")
    app.use(morgan("dev"))
}

/*Database connection*/
mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("Connected to mongoDB Atlas."))
    
    .catch(err => console.log(`Error occured: ${err}`))

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
