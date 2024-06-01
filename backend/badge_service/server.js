require("dotenv").config();
const express=require("express");
const app = express();
const bodyParser = require('body-parser')

//userdefined functions
const {connectDb}=require("./config/dbConfig")

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//router middlewares
app.use('/badges',require('./routes/badgeRoutes'));

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("user microservice started at "+port);
});
connectDb();


