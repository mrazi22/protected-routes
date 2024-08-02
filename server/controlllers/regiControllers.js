const createError = require("http-errors");
const Register = require("../models/registrationModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

module.exports = {
  Register: async (req, res, next) => {
    const { fname, lname, email, password, userType } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      const oldUser = await Register.findOne({ email });

      if (oldUser) {
        return next(createError(400, "User Exists")); // More specific error
      }
      await Register.create({
        fname,
        lname,
        email,
        password: encryptedPassword,
        userType,
      });
      res.send({ status: "ok" });
    } catch (error) {
      // Handle mongoose validation errors or other errors
      if (error.name === "MongoError" && error.code === 11000) {
        return next(createError(400, "Email already exists"));
      } else {
        return next(error);
      }
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await Register.findOne({ email });
    if (!user) {
      return next(createError(401, "User Not found")); // Unauthorized error
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
      });

      return res.json({ status: "ok", data: token }); // Directly return success
    }
    res.json({ status: "error", error: "Invalid Password" });
  },

 
  userData: async (req, res, next) => {
    const { token } = req.body;
  
    try {
      // Verify the token and get the decoded payload (user object)
      const decoded = await jwt.verify(token, JWT_SECRET);
  
      // Find the user based on the email from the decoded payload
      const user = await Register.findOne({ email: decoded.email });
  
      if (!user) {
        // User not found with the email from the token
        return res.json({ status: "error", data: "Invalid token or user not found" });
      }
  
      // User found, send the user data
      res.json({ status: "ok", data: user });
    } catch (error) {
      // Handle any errors (e.g., token verification error)
      if (error.name === 'JsonWebTokenError') {
        return res.json({ status: "error", data: "Invalid token" });
      } else {
        return next(error); // Pass other errors to central error handling
      }
    }
  },
  
};
