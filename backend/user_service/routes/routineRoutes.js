const express=require('express');
const route=express.Router();

const {createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutine} =require("../controller/routineController")



route.post('/',createRoutine);

route.put('/:id',updateRoutine);

route.delete('/:id',deleteRoutine);

route.get('/:id',getRoutine);



route.get('/',(req,res)=>{
    res.send("hello world~")
})
module.exports=route;





