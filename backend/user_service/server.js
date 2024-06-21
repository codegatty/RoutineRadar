require("dotenv").config();
const express=require("express");
const app = express();
const cors=require("cors");
const cookieParser=require("cookie-parser");

//userdefined functions
const connectDb=require("./config/dbConfig")

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}
));
app.use(cookieParser());

//router middlewares
app.use('/user/challenge',require('./routes/challengeRoutes'))
app.use('/user',require('./routes/userRoutes'))
app.use('/user/routine',require('./routes/routineRoutes'))
app.use('/user/roadMap',require('./routes/roadMapRoutes'))
app.use('/user/badge',require('./routes/badgeRoutes'))
app.use('/user/rating',require('./routes/ratingRoutes'))
app.use('/user/archived_routine',require('./routes/archivedRoutineRoutes'))
app.use('/user/analytics',require('./routes/analyticsRoutes'))

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("user microservice started at "+port);
});
connectDb();


