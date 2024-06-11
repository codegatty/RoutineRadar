const express= require('express');
const router=express.Router();
const asyncHandler=require("express-async-handler")
const Admin=require('../model/adminModel');
const axios=require("axios");


const tokenValidator = require('../middleware/tokenValidator');
const challenge_service_ip="172.18.0.6:5001"
const user_service_ip="172.18.0.7:5002"

router.get('/',tokenValidator,asyncHandler( async (req,res)=>{
    //admin Count
    const adminCount=await Admin.estimatedDocumentCount();

    //user count
    const request1=axios.get(`http://${challenge_service_ip}/challenge/count`);
    //challenge count
    const request2=axios.get(`http://${user_service_ip}/user/counts`)

    Promise.all([request1,request2]).then((responses)=>{
        const [response1,response2]=responses
        return res.status(200).json({adminCount:adminCount,
            challengeCount:response1.data.challengeCount,
            userCount:response2.data.userCount,
            barDataSet:response1.data.barDataSet
        });
        
    }).catch((er)=>{
        console.log(er);
        return res.status(400).json({message:"bad request"})
    })
    
}));


module.exports=router;