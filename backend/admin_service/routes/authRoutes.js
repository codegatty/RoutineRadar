const express= require('express');
const router=express.Router();

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

const {test,registerAdmin,loginAdmin,refresh}=require("../controller/authController")

router.post('/register',tokenValidator,registerAdmin);

router.post('/login',loginAdmin);

router.post("/refresh",refresh);

router.get('/check',test)

module.exports=router;