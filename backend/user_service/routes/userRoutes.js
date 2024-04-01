const express= require('express');
const router=express.Router();

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

const {deleteUser,loginUser,registerUser,updateUser,test}=require('../controller/userController');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.delete('/:id',tokenValidator,deleteUser);

router.put('/:id',tokenValidator,updateUser);

router.get('/check',test)

module.exports=router;