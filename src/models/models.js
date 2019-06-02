
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

const ConsumerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { 
        type: String,
        required: true
  },
  email: { 
    type: String,
    required: true
},
  password: { 
    type: String,
    required: true
},
  token: { 
    type: String
},
location: {
  type: Object
}
}) 

module.exports = mongoose.model('TrafficSchema', TrafficSchema),
mongoose.model('ConsumerSchema', ConsumerSchema)