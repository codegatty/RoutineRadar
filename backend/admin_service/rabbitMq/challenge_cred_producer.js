const amqp=require("amqplib");

let channel;
async function connToChallengeCredQ(){
    try{
        const connection=await amqp.connect(process.env.QUEUE_URL);
        channel=await connection.createChannel();
        
    }catch(e){
        console.log("someting went wrong during connection"+e);
    }
}   

async function challengeCREDProducer(operation,challenge) {
    const data={operation,
    challenge};
    
    try{
        if(!channel){
            console.log(channel)
            connToChallengeCredQ();
        }
        let queueName="CHALLENGE_CRED"
        await channel.assertQueue(queueName,{durable:false});
        channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)));
    }catch(e){
        console.log("someting went wrong during publishing"+e);
    }
    
}

module.exports={
    connToChallengeCredQ,
    challengeCREDProducer
}