const amqp = require("amqplib");
const express = require("express");
const app = express();

let channel;
let connection;

async function connToChallengeResponseQ() {
    try {
        connection = await amqp.connect(process.env.QUEUE_URL);
        connection.on('close', () => {
            console.error(`Connection closed, attempting to reconnect...`);
            setTimeout(connToChallengeResponseQ, 5000); // Retry after 5 seconds
        });
        channel = await connection.createChannel();
        channel.on('close', () => {
            console.error(`Channel closed, attempting to reconnect...`);
            setTimeout(connToChallengeResponseQ, 5000); // Retry after 5 seconds
        });
    } catch (e) {
        console.error(`Something went wrong during connection: ${e.message}`);
        setTimeout(connToChallengeResponseQ, 5000); // Retry after 5 seconds
    }
}

async function challengeResponseConsumer() {
    try {
        if (!channel) {
            console.log("Channel is not defined, initializing...");
            await connToChallengeResponseQ();
        }
        const queueName = "CHALLENGE_RESP";
        await channel.assertQueue(queueName, { durable: false });
        channel.consume(queueName, async (msg) => {
            const data = JSON.parse(msg.content.toString());
            process.emit("responseReceived", data);
            channel.ack(msg);
        }, { noAck: false });
    } catch (e) {
        console.error(`Something went wrong during consuming: ${e.message}`);
    }
}

module.exports = {
    connToChallengeResponseQ,
    challengeResponseConsumer
};
