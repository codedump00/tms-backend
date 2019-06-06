
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
          type: String,
          required: true
    },
    email: { 
      type: String,
      required: true,
      unique: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
  },
    password: { 
      type: String,
      required: true
  },
    token: { 
      type: String
  },
  location: {
    type: String
  }
  }) 

  module.exports = mongoose.model('ConsumerSchema', UserSchema)