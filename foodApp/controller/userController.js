const userModel = require('../models/userModel')

module.exports.getUser =  async function(req, res, next) {
    try{
        let id = req.params.id;
        let user = await userModel.findById(id)
        res.json({msg : "users retrieved",user});
    }
    catch (err){
        res.json({
            msg : err.message
        })
    }
}
//update user
module.exports.updateUser =  async function(req, res) {
    console.log(req.body);
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    try{
        if(user) {
            const keys = [];
            for(key in dataToBeUpdated) {
                keys.push(key)
            }
            for(let i = 0;i < keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]]
            }
            //e.g name = 'sid'
            const updateData = await user.save();
            res.json({
                message: "data updated succesfully"
            })
        } else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch(err) {
        res.json ({
            message : err.message,
        })
    }
}

module.exports.deleteUser = async function(req, res) {
    try{
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id)
        res.json({
            msg: "user has been deleted"
        });  
    }
    catch(err) {
        res.json({
            msg : err.message
        })
    }
   
}

module.exports.getAllUser = async function(req, res) {
    try{
        let alusers = await userModel.find()
        res.json({ msg: "user id is ",
        allusers
    });
    }
    catch(err) {
        res.json({
            msg : err.message
        })
    }
   
}