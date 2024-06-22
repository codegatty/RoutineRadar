require("dotenv").config();
const express=require("express");
const app = express();
const cors=require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:5173',
}))


//userdefined functions
const connectDb=require("./config/dbConfig")
const {connToChallengeCredQ,challengeCREDConsumer}=require("./rabbitMq/challenge_cred_consumer")
const {connToChallengeResponseQ} = require("./rabbitMq/challenge_response_producer")

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//router middlewares
app.use("/challenge",require("./routes/challengeRoutes"))
app.use("/challenge",require("./routes/noificationRoutes"))

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



