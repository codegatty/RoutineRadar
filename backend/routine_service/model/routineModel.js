const mongoose = require('mongoose');

const subTaskSchema=mongoose.Schema({
    description:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    order:{
        type:Number
    },
    weightage:{
        type:Number,
        required:[true,"Enter the admin name"]
    }
})

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    startTime:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    endTime:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    subTasks:[subTaskSchema],
    order:{
        type:Number
    },weightage:{
        type:Number,
        required:[true,"Enter the admin name"]
    }
})

const routinSchema=mongoose.Schema({
    goal:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    type:{
        type:String,
        required:[true,"Enter the admin name"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    routine:{
        type:[taskSchema]
    },
    score:{
        type:Number,
        default:0
    }
},{timestamps:true});

module.exports = mongoose.model("Routine",routinSchema);
