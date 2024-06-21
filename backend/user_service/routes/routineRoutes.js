const express=require('express');
const route=express.Router();

const {createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutine} =require("../controller/routineController")

    const tokenValidator=require("../middleware/tokenValidator")

const userRoutineValidator = require("../middleware/userRoutineValidator")

route.post('/',tokenValidator,createRoutine);

route.put('/:id',tokenValidator,userRoutineValidator,updateRoutine);

route.delete('/:id',tokenValidator,userRoutineValidator,deleteRoutine);

route.get('/:id',tokenValidator,getRoutine);

module.exports=route;





