const express = require("express");
const app = express();
app.use(express.json());

let users = {};

app.get('/users',(req,res) => {
    res.send(users);
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
app.listen(5000);