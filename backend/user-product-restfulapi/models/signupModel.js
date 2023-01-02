const mongoose = require("mongoose"); 
const validatorPhrase = require("validator");
const isEmpty = require("lodash.isempty");
const schema=mongoose.Schema;
const validator = require('validator');

const NewSchema = new schema({

  name: {
    type: String,
    minlength:[3,'Enter words more than 3 characters'],
    required: true,
  },
  
  email: {
    type:String,
    unique:true,
    lowercase: true,
    validate: {
      validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
  },
  required: [true, "Email required"]

  },
  password: {
    type: String,
    minlength:[6,'Password should be greater than or equal to 6 letters']
  },
  retype: {
    type: String,
    minlength:[6,'Password should be greater than or equal to 6 letters']
  },
  facebookId: {
    type: String,
  },
});

const User1 = new mongoose.model("members", NewSchema);

module.exports = User1;
