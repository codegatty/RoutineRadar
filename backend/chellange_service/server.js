require("dotenv").config();
const express=require("express");
const app = express();

//userdefined functions
const connectDb=require("./config/dbConfig")
const {connToChallengeCredQ,challengeCREDConsumer}=require("./rabbitMq/challenge_cred_consumer")
const {connToChallengeResponseQ} = require("./rabbitMq/challenge_response_producer")

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router middlewares
app.use("/challenge",require("./routes/challengeRoutes"))

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("challenges microservice started at "+port);
});
connectDb();
//! rabbitmq freezed current time being...
// connToChallengeResponseQ().then(()=>{
//     console.log("RabbitMQ connection established")
// });
// connToChallengeCredQ().then(async()=>{
//     console.log("RabbitMQ connection established")
//      challengeCREDConsumer()
// })



