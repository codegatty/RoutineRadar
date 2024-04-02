const amqp=require("amqplib");
//const {getResponse} = require("../controller/challangeQController")

let channel;
async function connToChallangeResponseQ(){
    try{
        const connection=await amqp.connect(process.env.QUEUE_URL);
        channel=await connection.createChannel();
        
    }catch(e){
        console.log("someting went wrong during connection"+e);
        
    }
}   

async function challengeResponseConsumer(res) {
    try{
        if(!channel){
            channel=await connToChallangeResponseQ();
        }

        let queueName="CHALLENGE_RESP"
        channel.assertQueue(queueName,{durable:false});
        channel.consume(queueName,(msg)=>{
            console.log(msg.content.toString());
            //res.status(200).send(msg.content.toString());
            channel.ack(msg);
        },{noack:false});

    }catch(err){
        console.log(err);
    }
    return res.status(200).send("hello world");
}


module.exports={
    connToChallangeResponseQ,
    challengeResponseConsumer
}