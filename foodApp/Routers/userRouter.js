const express = require("express");
const userRouter = express.Router();
const userModel = require('../models/userModel') 
const {protectRoute} = require('../helper')
const {getUser,updateUser,deleteUser,getAllUser} = require('../controller/userController')

//user options
userRouter
  .route('./:id')
  .patch(updateUser)
  .delete(deleteUser)

//profile page
app.use(protectRoute)
userRouter
  .route('/userProfile')
  .get(getUser)

//admin specific
app.use(isAuthorised(['admin']))
userRouter.route('')
  .get(getAllUser)

module.exports = userRouter