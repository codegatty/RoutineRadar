const mongoose = require('mongoose');
const asyncHandler=require('express-async-handler');

const connectDb=asyncHandler(async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connected to MongoDB');
    }catch(e){
        console.log("couldn't connect to MongoDB");
        console.log(e);
    }
    
})

module.exports=connectDb

