const mongoose = require('mongoose');

const challengeSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter the admin name"]
    },type:{
        type:String,
        required:[true,"Enter the admin name"]
    },duration:{
        type:Number,
        required:[true,"Enter the admin name"]
    },weightage:{
        type:Number,
        required:[true,"Enter the admin name"]
    },description:{
        type:String,
    },createdBy:{
        type:mongoose.Types.ObjectId
    }
},{timestamps:true});

module.exports = mongoose.model("Challenge",challengeSchema);
