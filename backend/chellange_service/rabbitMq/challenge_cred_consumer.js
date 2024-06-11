const amqp = require("amqplib");
const { createChallenge, deleteChallenge, updateChallenge, getAllChallenges } = require("../controller/challangeQController");

let channel = null;

async function connToChallengeCredQ() {
    try {
        const connection = await amqp.connect(process.env.QUEUE_URL);
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
    } catch (e) {
        console.error("Something went wrong during connection: ", e);
        // Optionally, retry connection after some time
        setTimeout(connToChallengeCredQ, 5000);
    }
}

async function challengeCREDConsumer() {
    try {
        if (!channel) {
            console.log("Channel is not defined, initializing...");
            await connToChallengeCredQ();
        }

        const queueName = "CHALLENGE_CRED";
        await channel.assertQueue(queueName, { durable: true }); // Use durable queue
        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                try {
                    await challengeHandler(data);
                    channel.ack(msg); // Acknowledge the message after processing
                } catch (e) {
                    console.error("Error handling message: ", e);
                    // Optionally, reject the message and requeue
                    channel.nack(msg, false, true);
                }
            }
        }, { noAck: false }); // Ensure acknowledgments are used

        console.log("Consumer is ready and waiting for messages...");

    } catch (e) {
        console.error("Something went wrong during consumer setup: ", e);
    }
}

async function challengeHandler(data) {
    try {
        switch (data.operation) {
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
                console.error("Unknown operation: ", data.operation);
        }
    } catch (e) {
        console.error("Error in challengeHandler: ", e);
        throw e; // Rethrow to ensure the message is not acknowledged in case of error
    }
}

module.exports = {
    connToChallengeCredQ,
    challengeCREDConsumer
}
