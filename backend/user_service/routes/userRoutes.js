const express= require('express');
const router=express.Router();
const upload= require('../middleware/multerUpload')



//user-defined middleware
// const tokenValidator = require('../middleware/tokenValidator');
const tokenValidator= require('../middleware/tokenValidatorAuth0');

const {deleteUser,loginUser,registerUser,updateUser,getAllUsers,getUserCount,getUser}=require('../controller/userController');

router.post('/register',upload.single("profilePic"),registerUser);

router.post('/login',loginUser);

router.delete('/:id',tokenValidator,deleteUser);

router.get('/userData',tokenValidator,getUser)

router.put('/:id',tokenValidator,updateUser);

router.get('/getAllUsers',getAllUsers)

router.get('/counts',getUserCount)

module.exports=router;