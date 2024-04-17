const express= require('express');
const router=express.Router();

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

const {
    createRoutine,
    deleteRoutine,
    getRoutine,
    updateRoutine,
    addTask,
    updateTask,
    deleteTask,
    addSubTask,
     updateSubTask}=require("../controller/routineController");

router.post('/',createRoutine);
router.delete('/:id',deleteRoutine);
router.get('/:id',getRoutine);
router.put('/:id',updateRoutine);

router.put('/task/add/:id',addTask)
router.put('/task/update/:id',updateTask);
router.put('/task/delete/:id',deleteTask);

router.put('/task/sub_task/add/:id',addSubTask)
router.put('/task/sub_task/update/:id',updateSubTask)

module.exports=router;