const express= require('express');
const router=express.Router();

const {getArchivedRoutinesByUserId,reUseArchivedRoutine}=require("../controller/archivedRoutineController")

router.get("/:id",getArchivedRoutinesByUserId)
router.post("/re_use/:routineId",reUseArchivedRoutine)

module.exports=router;