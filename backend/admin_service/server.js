require("dotenv").config();
const express=require("express");
const app = express();

//userdefined functions
const connectDb=require("./config/dbConfig")

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router middlewares
app.use("/admin/auth",require("./routes/authRoutes"))


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("admin microservice started at "+port);
});
connectDb();


