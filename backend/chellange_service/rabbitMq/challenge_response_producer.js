const amqp = require("amqplib");

let channel;
async function connToChallengeResponseQ() {
    try {
        const connection = await amqp.connect(process.env.QUEUE_URL);
        channel = await connection.createChannel();
    } catch (e) {
        console.error(`Something went wrong during connection: ${e.message}`);
    }
}

async function challengeResponseProducer(response) {
    try {
        if (!channel) {
            await connToChallengeResponseQ();
        }
        const queueName = "CHALLENGE_RESP";
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(response)));
    } catch (e) {
        console.error(`Something went wrong during publishing: ${e.message}`);
    }
}

module.exports = {
    connToChallengeResponseQ,
    challengeResponseProducer
};
