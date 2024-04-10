const mongoose = require('mongoose');

const adminSchema=mongoose.Schema({
    adminName:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    email:{
        type:String,
        required:[true,"Enter the email"]
    },password:{
        type:String,
        required:[true,"Enter the password"]
    },createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Admin"
    }
},{timestamps:true});

module.exports = mongoose.model("Admin",adminSchema);
