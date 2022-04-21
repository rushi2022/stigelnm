const mongoose = require("mongoose");

const customerSchma = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isTrue: {
    type:Boolean,
    
  },
});

const Register = new mongoose.model("Register", customerSchma);

module.exports = Register;
