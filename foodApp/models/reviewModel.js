const mongoose = require("mongoose");
const { db_link } = require("../secrets");
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("plan db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
});

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        require:[true,'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'rating is required']
    },
    createdAt : {
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel",
        required:[true,"review must belong to a user"]
    },
    plan:{
        type:mongoose.Schema.objectId,
        ref:"planModel",
        required:[true,"plan must belong to a user"]
    }
})


reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select : "name profilImage"
    }).populate("plan");
    next();
})

const reviewModel = mongoose.model("reviewModel",reviewSchema);
module.exports = reviewModel