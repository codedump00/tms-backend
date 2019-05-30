
const express = require('express')
const app = express()

const detectorRoute = require('./routes/detector')

const PORT = process.env.PORT || 3000

app.use(detectorRoute)
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`)
})