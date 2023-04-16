const express = require("express");
const app = express();
const userRouter = express.Router();
const userModel = require('../models/userModel') 
const {protectRoute,isAuthorised} = require('../helper')
const {getUser,updateUser,deleteUser,getAllUser} = require('../controller/userController')
const {signup,login} = require('../controller/authController')
//user options
userRouter
  .route('./:id')
  .patch(updateUser)
  .delete(deleteUser)

  userRouter.route('/login')
  .post(login);
  userRouter.route('/signup')
  .post(signup)
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