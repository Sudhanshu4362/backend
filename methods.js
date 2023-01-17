const express = require("express");
const app = express();
app.use(express.json());

let users = [{
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
//with query
app.get('/users',(req,res) => {
    console.log(req.query);
    let {name,age} = req.query;
    let filteredData =  users.filter((userObj) => {
        return (userObj.name === name && userObj.age === age)
    })
    res.send(filteredData)
    // res.send(users);
})

app.post('/users',(req,res) => {
    console.log(req.body);
    res.json({
        messsage:"Data recieved successfully",
        user: req.body
    })
})


app.patch('/users',(req,res) => {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated) {
        users[key]  = dataToBeUpdated
    }
    res.json({
        messsage:"data updated successfully"
    })
})

app.delete('/users',(req,res) => {
    users = {};
    res.json({
        msg : "user has been deleted"
    })
})


//params
app.get('/users/:id',(req,res) => {
    console.log(req.params.id);
    // let {id} = req.params;
    // let user = db.findOne(id);
    res.json({msg : "user id is","obj":req.params});
})

app.listen(5000);