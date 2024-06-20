const mongoose=require("mongoose")

const analyticsSchema=mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:[true,"Enter the user id"]
    },
    weeklyTaskData:{
        type:[Number],
        default:[0,0,0,0,0,0,0]
        },
        weeklyScoreData:{
            type:Number,
            default:0
        }
},{timestamps:true})

module.exports = mongoose.model("Analytics",analyticsSchema)
