const Challenge=require("../model/challengeModel")

const {challengeResponseProducer}=require("../rabbitMq/challenge_response_producer")

async function createChallenge(data){
    
    try{
    const newChallenge=await Challenge.create(data.challenge);
        challengeResponseProducer(newChallenge)
    }catch(err){
        console.log("error creating challenge"+err);
    }
    
}

async function updateChallenge(data){
    const id=data.challenge.id;
    let udpateData=data.challenge.challenge
    
    try{
        const challenge= await Challenge.findByIdAndUpdate(id,udpateData,{new:true});
        console.log(challenge);
        challengeResponseProducer(challenge)
        
    }catch(err){console.log("error updating challenge"+err)}

}

async function deleteChallenge(data){
    const id=data.challenge.id;
    try{
        const challenge = await Challenge.findById(id);
        console.log(challenge)
        await Challenge.deleteOne({_id:id})
        challengeResponseProducer(challenge)
    }catch(err){console.log("error deleting challenge"+err)}
}

async function getAllChallenges(){
    const challenges=await Challenge.find({});
    challengeResponseProducer(challenges)
}

module.exports={createChallenge,updateChallenge,deleteChallenge,getAllChallenges}

