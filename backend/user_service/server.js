require("dotenv").config();
const express=require("express");
const app = express();
const cors=require("cors");

//userdefined functions
const connectDb=require("./config/dbConfig")

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use(cors());

//router middlewares
app.use('/user',require('./routes/userRoutes'))
app.use('/user/routine',require('./routes/routineRoutes'))
app.use('/user/roadMap',require('./routes/roadMapRoutes'))
app.use('/user/badge',require('./routes/badgeRoutes'))

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("user microservice started at "+port);
});
connectDb();


