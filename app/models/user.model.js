const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: {
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
  role:{
    type:String,
    enum:["user", "admin", "moderator"]
  }
})

module.exports = mongoose.model('user', user)
