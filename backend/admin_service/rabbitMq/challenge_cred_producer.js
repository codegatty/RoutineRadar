const amqp = require("amqplib");

let channel;
async function connToChallengeCredQ() {
    try {
        const connection = await amqp.connect(process.env.QUEUE_URL);
        connection.on('error', async (err) => {
            console.error(`Connection error: ${err.message}`);
            await connToChallengeCredQ();
        });
        channel = await connection.createChannel();
        channel.on('error', async (err) => {
            console.error(`Channel error: ${err.message}`);
            await connToChallengeCredQ();
        });
    } catch (e) {
        console.error(`Something went wrong during connection: ${e.message}`);
        setTimeout(connToChallengeCredQ, 5000); // Retry after 5 seconds
    }
}

async function challengeCREDProducer(operation, challenge) {
    const data = { operation, challenge };

    try {
        if (!channel) {
            console.log("Channel is not defined, initializing...");
            await connToChallengeCredQ();
        }
        const queueName = "CHALLENGE_CRED";
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (e) {
        console.error(`Something went wrong during publishing: ${e.message}`);
    }
}

module.exports = {
    connToChallengeCredQ,
    challengeCREDProducer
};
