
const mongoose = require('mongoose')

const TrafficSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  pos: { 
        type: String,
        required: true
  },
  status: { 
    type: String,
    required: true
},
  density: { 
    type: Number,
    required: true
},
  count: { 
    type: Number,
    required: true
}
}) 

module.exports = mongoose.model('Traffic', TrafficSchema)