const mongoose = require('mongoose');


const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    email:{
        type:String,
        required:[true,"Enter the email"]
    },password:{
        type:String,
        required:[true,"Enter the password"]
    },experience:{
        type:Number,
        default:0,
    },badges:{
        type:[Number],
        default:[]
    },
    profilePic:{
        type:String,
    },
    isRoutineCreated:{
        type:Boolean,
        default:false
    },
        challengeId:{
            type:mongoose.SchemaTypes.ObjectId,
            default:null
        },
    participatedChallengeIds:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[]
    }
    
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);
