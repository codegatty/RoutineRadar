const express= require('express');
const router=express.Router();

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

const {currentAdmin,registerAdmin,loginAdmin,refresh,getAllAdmins}=require("../controller/authController")

router.post('/register',tokenValidator,registerAdmin);

router.post('/login',loginAdmin);

router.post("/refresh",refresh);

router.get('/current',tokenValidator,currentAdmin);

router.get('/admins',tokenValidator,getAllAdmins);

module.exports=router;