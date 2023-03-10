const express = require("express");
const app = express();
const mongoose = require('mongoose')
const { db_link } = require('./secrets')
mongoose.set("strictQuery", false);
const { Schema } = mongoose;

app.use(express.json());

let user = [{
    id: 1,
    name: "sid",
    age: 21
},
{
    id: 1,
    name: "Sova",
    age: 21
}, {
    id: 1,
    name: "Raunak",
    age: 22
}
];

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user', userRouter);
app.use("/auth", authRouter);
userRouter
    .route("/")
    //first middleware 1 will run after excuting it getUser will run through next and then middleware2 will run and we will get our response
    // .get(middleware1, getUsers, middleware2)
    .get(middleware1,getUsers)
    .post(postUser)
    .patch(patchUser)
    .delete(deleteUser)

userRouter
    .route("/:id")
    .get(getUserById)

authRouter
    .route("/signup")
    .get(getSignUp).post(postSignUp);
// app.get('/user',)

// app.post('/user',)


// app.patch('/user',)

// app.delete('/user',)


//params
// app.get('/user/:id',)

function middleware1(req, res, next) {
    console.log("middleware1 is called");
    next();
}

function middleware2(req, res,) {
    console.log("middleware2 is called");
    res.json({ msg: "user returned" })
}

async function getUsers(req, res, next) {
    console.log(req.query);
    let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);
    //get all users from database
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

function patchUser(req, res) {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully"
    })
}

function deleteUser(req, res) {
    user = {};
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

function getSignUp(req, res) {
    res.sendFile("/public/index.html", { root: __dirname })
}

async function postSignUp(req, res) {
    // let { email, name, password } = req.body;
    try {let data = req.body;
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
app.listen(5000);

mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
        console.log(err);
    });



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    confirmpassword: {
        type: String,
        required: true,
        minLength: 7
    }
})

//model
const userModel = mongoose.model("userModel", userSchema)

// let obj = {
//     1 : (async function createUser() {
//         let user = {
//             name: "Sudhanshu",
//             email: "a2b2c@gmail.com",
//             password: "1234567",
//             confirmpassword: "1234567"
//         };
//         let data = await userModel.create(user);
//         console.log(data);
//     })()
// }