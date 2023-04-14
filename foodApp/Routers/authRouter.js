const express = require("express");
const userModel = require("../models/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_KEY = '2rwr34w3ese6fese'
authRouter
   .route("/signup")
   .get(getSignUp)
   .post(postSignUp);

authRouter
   .route('/login')
   .post(loginUser);

function getSignUp(req, res) {
    res.sendFile("/public/index.html", { root: __dirname })
}

async function postSignUp(req, res) {
    // let { email, name, password } = req.body;
    try {
    let data = req.body;
    let user = await userModel.create(data);
    console.log(data);
    res.json({
        msg: "user signed up",
    
    })
}
catch(err){
    res.json({
        err
    })
}
}

async function loginUser(req,res) {
    try{
        let {email,password} = req.body;
        let user = await userModel.findOne({email:email});
        if(user){
            //check if password matches
            if(password == user.password) {
                let uid = user["_id"];
                var token = jwt.sign({payload : uid},JWT_KEY)
                res.cookie('login',token)
                res.json({
                    msg : "user logged in",
                })
            } else {
                res.json({
                    msg : "wrong credentials"
                })
            }
        } else{
            res.json({
            msg:"user not found"
        })
      }
    }
    catch(err) {
        res.json({
            msg :err.message
        })
    }
    
}

module.exports = authRouter