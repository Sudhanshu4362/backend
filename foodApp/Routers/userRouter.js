const express = require("express");
const userRouter = express.Router();
const userModel = require('../models/userModel') 
const {protectRoute} = require('../helper')
const {getUsers,postUser,patchUser,deleteUser,getUserById,setCookies,getCookies} = require('../controller/userController')
userRouter
    .route("/")
    //first middleware 1 will run after excuting it getUser will run through next and then middleware2 will run and we will get our response
    // .get(middleware1, getUsers, middleware2)
    .get(protectRoute,getUsers)
    .post(postUser)
    .patch(patchUser)
    .delete(deleteUser)
userRouter
  .route("/setcookies")
  .get(setCookies)
userRouter
  .route("/getcookies")
  .get(getCookies)
userRouter
  .route("/:name")
  .get(getUserById)


module.exports = userRouter