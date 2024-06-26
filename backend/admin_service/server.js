require("dotenv").config();
const express=require("express");
const cookieParser=require("cookie-parser");
const bodyParser = require('body-parser');
const cors=require("cors");
const app = express();

//userdefined functions
const connectDb=require("./config/dbConfig")
const {connToChallengeCredQ}=require("./rabbitMq/challenge_cred_producer");
const {connToChallangeResponseQ}=require("./rabbitMq/challenge_response_consumer");

// Increase the limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use(cookieParser());

//router middlewares
app.use("/admin/auth",require("./routes/authRoutes"));
app.use("/admin/challenges",require("./routes/challengeRoute"));
app.use("/admin/users",require("./routes/userRoutes"));
app.use("/admin/counts",require("./routes/countRoute"));
app.use("/admin/badges",require("./routes/badgeRoute"));

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

