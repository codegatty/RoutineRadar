require("dotenv").config();
const express=require("express");
const app = express();
const cors=require("cors")

//userdefined functions
const connectDb=require("./config/dbConfig")

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:5173',
    
}))

//router middlewares
app.use('/routine',require('./routes/routineRoutes'))

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("user microservice started at "+port);
});
connectDb();


