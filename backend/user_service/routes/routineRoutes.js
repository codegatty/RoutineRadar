const express=require('express');
const route=express.Router();

const {createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutine} =require("../controller/routineController")

const userRoutineValidator = require("../middleware/userRoutineValidator")

route.post('/',createRoutine);

route.put('/:id',userRoutineValidator,updateRoutine);

route.delete('/:id',userRoutineValidator,deleteRoutine);

route.get('/:id',userRoutineValidator,getRoutine);

module.exports=route;





