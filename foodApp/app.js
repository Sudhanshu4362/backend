const express = require("express");
const app = express();
app.use(express.json());

let user = [{
    id: 1,
    name : "sid",
    age : 21
},
{
    id: 1,
    name : "Sova",
    age : 21
},{
    id: 1,
    name : "Raunak",
    age : 22
}
];

const userRouter = express.Router();
app.use('/user',userRouter);
userRouter
.route("/")
.get(getUser)
.post(postUser)
.patch(patchUser)
.delete(deleteUser)

userRouter.route("/:id").get(getUserById)
// app.get('/user',)

// app.post('/user',)


// app.patch('/user',)

// app.delete('/user',)


//params
// app.get('/user/:id',)

function getUser(req, res){
    console.log(req.query);
    let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);
    res.send(user);
}

function postUser(req, res){
    console.log(req.body.Name);
    //then i can put this in db 
    user.push(req.body);
    res.json({
        message: "Data received successfully",
        user: req.body
    });
}

function patchUser(req, res){
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully"
    })
}

function deleteUser(req, res){
    user = {};
    res.json({
        msg: "user has been deleted"
    });
}

function getUserById(req, res){
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", "obj": req.params });
}

app.listen(5000);