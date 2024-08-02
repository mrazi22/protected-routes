const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema

const registrationSchema = new Schema({   
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    userType: String,
    





 })

 const Register = mongoose.model("Register", registrationSchema);

 module.exports = Register