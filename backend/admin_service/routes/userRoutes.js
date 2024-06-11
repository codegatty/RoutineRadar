const express=require("express");
const router=express.Router();
const tokenValidator=require("../middleware/tokenValidator");

const {getAlluers} =require("../controller/userController");

router.get('/',getAlluers);

module.exports=router;

