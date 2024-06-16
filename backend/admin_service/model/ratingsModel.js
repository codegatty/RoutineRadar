const mongoose = require('mongoose');

const ratingSchema=mongoose.Schema({
    stars:{
        type:[Number],
        default:[0,0,0,0,0]
    }
},{timestamps:true});

module.exports = mongoose.model("Rating",ratingSchema);
