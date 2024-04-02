const asyncHandler=require("express-async-handler");
const {challengeCREDProducer}=require("../rabbitMq/challenge_cred_producer");
const {challengeResponseConsumer,connToChallangeResponseQ}=require("../rabbitMq/challenge_response_consumer");


//@desc get all chellanges based on admin
//@route GET /challenge
//@access private

const getChallenges=asyncHandler(async(req,res)=>{

    let response={"msg": "challenge could not be created"}
     challengeResponseConsumer(res);
    // console.log(response);
    
    // return res.status(201).json(response);
})


//@desc create a new challenge
//@route POST /challenge
//@access public
const createChallenge=asyncHandler(async(req,res)=>{

    const {name,type,duration,weightage,description}=req.body;

    if(!name || !type || !duration || !weightage || !description){
        return res.status(400).json({msg:"Please fill all the fields"});
    }
    const challenge={
        name,
        type,
        duration,
        weightage,
        description,
        createdBy:req.admin.id
    }
    challengeCREDProducer("create",challenge)

    challengeResponseConsumer().then((response) =>{
        

        if(!response){
            return res.status(400).json({msg:"challenge could not be created"});
        }else{
            return res.status(201).json(response);
        }
    
    }).catch(()=>{
        console.error("Error creating challenge:", error);
        return res.status(400).json({msg:"challenge could not be created"});
    })
    // return res.status(201).json("chellange created successfully");
})

//@desc delete a challenge
//@route DELETE /challenge/id
//@access public
const deleteChallenge=asyncHandler(async(req,res)=>{

    challengeCREDProducer("delete",{id:req.params.id})

    challengeResponseConsumer().then((response) =>{
        if(response==null|| !response){
            return res.status(400).json({msg:"challenge could not be deleted"});
        }else{
        return res.status(201).json(response);
        }
    }).catch((error)=>{
        console.error("Error creating challenge:", error);
        return res.status(400).json({msg:"challenge could not updated"});
    })
})

//@desc update a challenge
//@route PUT /challenge
//@access public
const updateChallenge=asyncHandler(async(req,res)=>{
    const {name,type,duration,weightage,description}=req.body;

    if(!name || !type || !duration || !weightage || !description){
        return res.status(400).json({msg:"Please fill all the fields"});
    }



    const challenge={id:req.params.id,challenge:{
        name,
        type,
        duration,
        weightage,
        description,
    }}
    challengeCREDProducer("update",challenge)
    challengeResponseConsumer().then((response) =>{
        if(response==null|| !response){
            return res.status(400).json({msg:"challenge could not be updated"});
        }else{
        return res.status(201).json(response);
        }
    }).catch((error)=>{
        console.error("Error creating challenge:", error);
        return res.status(400).json({msg:"challenge could not updated"});
    })
    
})

const test=asyncHandler(async(req,res)=>{
    return res.send("all fine");
})  


module.exports={getChallenges,createChallenge,updateChallenge,deleteChallenge,test}




