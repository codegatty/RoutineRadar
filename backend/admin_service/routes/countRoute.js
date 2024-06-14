const express= require('express');
const router=express.Router();
const asyncHandler=require("express-async-handler")
const Admin=require('../model/adminModel');
const axios=require("axios");


const tokenValidator = require('../middleware/tokenValidator');

const challenge_service_url=process.env.CHALLENGE_SERVICE
const user_service_url=process.env.USER_SERVICE

router.get('/',tokenValidator,asyncHandler( async (req,res)=>{
    //admin Count
    const adminCount=await Admin.estimatedDocumentCount();

    //user count
    const request1=axios.get(`${challenge_service_url}/challenge/count`);
    //challenge count
    const request2=axios.get(`${user_service_url}/user/counts`)

    Promise.all([request1,request2]).then((responses)=>{
        const [response1,response2]=responses
        return res.status(200).json({adminCount:adminCount,
            challengeCount:response1.data.challengeCount,
            userCount:response2.data.userCount,
            challengeBarData:response1.data.barDataSet,
            userBarData:response2.data.barDataSet,
            noRoutineEnabledUsers:response2.data.noRoutineEnabledUsers
        });
        
    }).catch((er)=>{
        console.log(er);
        return res.status(400).json({message:"bad request"})
    })
    
}));


module.exports=router;