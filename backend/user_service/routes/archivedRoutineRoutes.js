const express= require('express');
const router=express.Router();

const {getArchivedRoutinesByUserId,reUseArchivedRoutine,deleteRoutineForever}=require("../controller/archivedRoutineController")
const tokenValidator=require("../middleware/tokenValidator")
router.delete('/delete/:routineId',tokenValidator,deleteRoutineForever)
router.post("/re_use/:routineId",tokenValidator,reUseArchivedRoutine)
router.get("/:id",tokenValidator,getArchivedRoutinesByUserId)

module.exports=router;