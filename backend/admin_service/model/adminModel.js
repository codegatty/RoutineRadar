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
        type:mongoose.Types.ObjectId,
        required:[true,"Enter the createdBy"],
         ref:"Admin"
    }
},{timestamps:true});

module.exports = mongoose.model("Admin",adminSchema);
