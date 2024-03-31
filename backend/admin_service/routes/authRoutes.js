const express= require('express');
const router=express.Router();

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

const {test,registerAdmin,loginAdmin}=require("../controller/authController")

router.post('/register',tokenValidator,registerAdmin);

router.post('/login',loginAdmin);

router.get('/check',test)

module.exports=router;