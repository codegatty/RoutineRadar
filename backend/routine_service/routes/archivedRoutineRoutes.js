const express=require("express");
const router=express.Router();
const {getArchivedRoutines,reUseRoutine}=require("../controller/archivedRoutineController")

router.post("/re_use/:routineId",reUseRoutine)
router.get("/:id",getArchivedRoutines)

module.exports=router