const mongoose = require('mongoose')
const { db_link } = require("../secrets")
const emailValidator = require("email-validator");
const { Schema } = mongoose;
mongoose.set('strictQuery', false)
const bcrypt = require('bcrypt');

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
        required: true,
        validate: function() {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        validate: function() {
            return this.confirmpassword == this.password
        }
    },
    confirmpassword: {
        type: String,
        required: true,
        minLength: 7
    }
})
// ------------->learning hooks<-------------------
//pre and post hooks in mongoose
// userSchema.pre('save',function() {
//     console.log("before saving in db");
// })

// userSchema.post("save",function() {
//     console.log("after saving in db");
// })

userSchema.pre('save',function() {
    // console.log("before saving in db");
    this.confirmpassword = undefined;
})

userSchema.pre('save',async function() {
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password,salt)
    this.password = hashedString
    // console.log(hashedString);
})
//model
const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel