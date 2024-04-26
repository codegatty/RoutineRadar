const mongoose=require('mongoose');

const roadMapSchema=mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    },
    map:{
        type:[String],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports=mongoose.model('RoadMap',roadMapSchema);

