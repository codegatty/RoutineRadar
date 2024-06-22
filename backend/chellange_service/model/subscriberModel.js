const mongoose = require('mongoose');

const subscriberSchema=mongoose.Schema({
    subscriber:{
        type:Object
    }
},{timestamps:true});

module.exports = mongoose.model("Subscribers",subscriberSchema);
