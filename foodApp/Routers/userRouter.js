const express = require("express");
const userRouter = express.Router();
const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken");
const JWT_KEY = '2rwr34w3ese6fese';
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

function protectRoute(req,res,next) {
    if(req.cookies.login) {
        let token = req.cookies.login
        let isVerified = jwt.verify(token,JWT_KEY);
        if(isVerified) {
            next();
        } else {
            req.json({
                msg : "user not verified"
            })
        }
    } else {
        return res.json({
            msg : 'operation not allowed'
        })
    }
}
async function getUsers(req, res, next) {
    // console.log(req.query);
    // let { name, age } = req.query;
    //filtering
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);
    //get all users from database --> mongodb 
    let allusers = await userModel.find()
    res.json({msg : "users retrieved",allusers});
    // res.send(user);
    // console.log("get user called");
    // next();
}

function postUser(req, res) {
    console.log(req.body.Name);
    //then i can put this in db 
    user.push(req.body);
    res.json({
        message: "Data received successfully",
        user: req.body
    });
}

//update user
 async function patchUser(req, res) {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    // for (key in dataToBeUpdated) {
    //     user[key] = dataToBeUpdated[key];
    //
    let doc  = await userModel.findOneAndUpdate({email:"abc@gmail.com"},dataToBeUpdated)
    res.json({
        message: "data updated succesfully"
    })
}

async function deleteUser(req, res) {
    // user = {};

    //we use remove if we have to give whole data of removed collection
    //we use delete if we want to give count of deleted collection
    let doc = await userModel.deleteOne({email:"ab2c@gmail.com"})
    console.log(doc);
    res.json({
        msg: "user has been deleted"
    });
}

function getUserById(req, res) {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", "obj": req.params });
}

function setCookies(req,res){
    // res.setHeader('set-Cookie','isLoggedIn = true');
    res.cookie('isLoggedIn',false,{maxAge:10000,secure :true});
    res.cookie('password',12345678,{secure :true});
    res.send('cookies has been set')
}
function getCookies(req,res){
   let cookies = req.cookie.password;
   console.log(cookies);
   res.send('cookies recieved')
}

// let isLoggedIn = true;
module.exports = userRouter