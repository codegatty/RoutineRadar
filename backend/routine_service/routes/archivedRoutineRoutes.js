const express=require("express");
const router=express.Router();
const {getArchivedRoutines,deleteForever,reUseRoutine}=require("../controller/archivedRoutineController")

router.post("/re_use/:routineId",reUseRoutine)
router.get("/:id",getArchivedRoutines)
router.delete("/:routineId",deleteForever)

module.exports=router