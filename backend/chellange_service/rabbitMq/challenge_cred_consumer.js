const amqp=require("amqplib");
const {createChallenge,deleteChallenge,updateChallenge,getAllChallenges} = require("../controller/challangeQController")

let channel;
async function connToChallengeCredQ(){
    try{
        const connection=await amqp.connect(process.env.QUEUE_URL);
        channel=await connection.createChannel();
        
    }catch(e){
        console.log("someting went wrong during connection"+e);
        
    }
}   

async function challengeCREDConsumer() {
    let data
    try{
        if(!channel){
            console.log(channel)
            connToChallengeCredQ();
        }
        let queueName="CHALLENGE_CRED"
        await channel.assertQueue(queueName,{durable: false});
        channel.consume(queueName,async (msg)=>{
             data=JSON.parse(msg.content);
             await challengeHandler(data)
             channel.ack(msg);
    },{noack:false});
    }catch(e){
        console.log("someting went wrong during publishing"+e);
    }
    return data;
}


async function challengeHandler(data){
    switch(data.operation){
        case "create":
            await createChallenge(data);
            break;
        case "update":
            await updateChallenge(data);
            break;
        case "delete":
            await deleteChallenge(data);
            break;
        case "getAll":
            await getAllChallenges();
            break;
        default:
            break;
    }
}
module.exports={
    connToChallengeCredQ,
    challengeCREDConsumer
}