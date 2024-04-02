require("dotenv").config();
const express=require("express");
const app = express();

//userdefined functions
const connectDb=require("./config/dbConfig")
const {connToChallengeCredQ}=require("./rabbitMq/challenge_cred_producer");
const {connToChallangeResponseQ}=require("./rabbitMq/challenge_response_consumer");


//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router middlewares
app.use("/admin/auth",require("./routes/authRoutes"))
app.use("/admin/challenges",require("./routes/challengeRoute"));


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("admin microservice started at "+port);
});
connectDb();
connToChallengeCredQ().then(()=>{
    console.log("rabbitMq connection established");
});
connToChallangeResponseQ().then(()=>{
    console.log("rabbitMq connection established");
});

