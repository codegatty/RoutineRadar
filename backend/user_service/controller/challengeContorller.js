const asyncHandler = require("express-async-handler");
const axios=require("axios")
const User=require("../model/userModel")

const challenge_service_url=process.env.CHALLENGE_SERVICE

const getChallenges=asyncHandler(async (req,res)=>{
    axios.get(`${challenge_service_url}/challenge`).then(async(response)=>{
        const userId=req.params.id
        const result=response.data
        let  challengeIds=await User.findOne({_id:userId},{participatedChallengeIds:1,_id:0})
        challengeIds=challengeIds.participatedChallengeIds
        

        const finalData = result.filter(
            challenge => !challengeIds.includes(challenge._id)
          );

        res.status(200).json(finalData)
    }).catch((error)=>{
        res.status(400).json({message:"couldn't fetch challenges"})
    })
})

const updateChallengeId=asyncHandler(async(req,res)=>{
   
    const userId=req.params.id;
    const {challengeId}=req.body

    const user=await User.findOne({_id:userId})

    if(!user){
        return res.status(400).json({message:"user not available"})
    }

     const response =await axios.get(`${challenge_service_url}/challenge/`+challengeId)

    if(response.status!==200){
        res.status(400).json({message:"challenge is not there"})
    }
    const challenge=response.data
   
    await User.findByIdAndUpdate(userId,{
        $set:{challengeId:challengeId}
    },{new:true})
   

    const total_milliseconds=parseInt(challenge[0].duration)*60*60*1000
    setTimeout(async ()=>{
        try{
        await User.findByIdAndUpdate(userId,{
            $set:{challengeId:null}
        })
    }catch(e){
        console.log(error)
    }
    },total_milliseconds)
    

    res.status(200).json({"message":"challengeId updated"})
})

const onCompleteChallenge=asyncHandler(async(req,res)=>{
    const userId=req.params.id
    const {challengeId}=req.body

    const user=await User.findOne({_id:userId})

    if(!user){
        return res.status(400).json({message:"user not available"})
    }

    const response =await axios.get(`${challenge_service_url}/challenge/`+challengeId)

    if(response.status!==200){
        res.status(400).json({message:"challenge is not there"})
    }
    const oldExp=user.experience
    const result=await User.findByIdAndUpdate(userId,{
        $push:{participatedChallengeIds:challengeId
        },
        $set:{challengeId:null,experience:oldExp+response.data[0].weightage}
    },{new:true}).select('participatedChallengeIds')
    
   res.status(200).json({message:"update completed"})
})

module.exports={getChallenges,updateChallengeId,onCompleteChallenge}