const mongoose=require('mongoose');

const path=mongoose.Schema({
    name:{
        type: 'string',
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

const roadMapSchema=mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    },
    paths:{
        type:[path],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports=mongoose.model('RoadMap',roadMapSchema);

