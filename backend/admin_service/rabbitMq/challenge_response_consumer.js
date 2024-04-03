const amqp = require("amqplib");
const express = require("express");
const app = express();
//const {getResponse} = require("../controller/challangeQController")

let channel;
async function connToChallangeResponseQ() {
    try {
        const connection = await amqp.connect(process.env.QUEUE_URL);
        channel = await connection.createChannel();

    } catch (e) {
        console.log("someting went wrong during connection" + e);

    }
}

async function challengeResponseConsumer() {
    let data
    try {
        if (!channel) {
            console.log(channel)
            connToChallengeCredQ();
        }
        let queueName = "CHALLENGE_RESP"
        await channel.assertQueue(queueName, { durable: false });
        channel.consume(queueName, async (msg) => {
            data = JSON.parse(msg.content);
            //console.log(data);

            process.emit("responseReceived", data);
            channel.ack(msg);
        }, { noack: false });

    } catch (e) {
        console.log("someting went wrong during publishing" + e);
    }

}



module.exports = {
    connToChallangeResponseQ,
    challengeResponseConsumer
}