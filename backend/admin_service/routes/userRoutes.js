const express=require("express");
const router=express.Router();
const tokenValidator=require("../middleware/tokenValidator");

const {getAlluers} =require("../controller/userController");

router.get('/',tokenValidator,getAlluers);

module.exports=router;

