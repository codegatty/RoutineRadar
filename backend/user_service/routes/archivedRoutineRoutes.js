const express= require('express');
const router=express.Router();

const {getArchivedRoutinesByUserId,reUseArchivedRoutine,deleteRoutineForever}=require("../controller/archivedRoutineController")

router.delete('/delete/:routineId',deleteRoutineForever)
router.post("/re_use/:routineId",reUseArchivedRoutine)
router.get("/:id",getArchivedRoutinesByUserId)

module.exports=router;