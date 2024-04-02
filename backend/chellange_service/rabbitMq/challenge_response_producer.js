const amqp=require("amqplib");

let channel;
async function connToChallengeResponseQ(){
    try{
        const connection=await amqp.connect(process.env.QUEUE_URL);
        channel=await connection.createChannel();
        
    }catch(e){
        console.log("someting went wrong during connection"+e);
    }
}   

async function challengeResponseProducer(response) {

    try{
        if(!channel){
            console.log(channel)
            connToChallengeResponseQ();
        }
        let queueName="CHALLENGE_RESP"
        await channel.assertQueue(queueName,{durable:false});
        channel.sendToQueue(queueName,Buffer.from(JSON.stringify(response)));
    }catch(e){
        console.log("someting went wrong during publishing"+e);
    }
    
}

module.exports={
    connToChallengeResponseQ,
    challengeResponseProducer
}