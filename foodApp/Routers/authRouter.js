const express = require("express");
const userModel = require("../models/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../secrets')
// authRouter
//    .route("/signup")
//    .get(getSignUp)
//    .post(postSignUp);

// authRouter
//    .route('/login')
//    .post(loginUser);

module.exports = authRouter