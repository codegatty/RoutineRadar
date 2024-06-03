const express= require('express');
const router=express.Router();
const upload= require('../middleware/multerUpload')



//user-defined middleware
 const tokenValidator = require('../middleware/tokenValidator');
const {deleteUser,loginUser,registerUser,updateUser,getAllUsers,getUserCount,getUser}=require('../controller/userController');

 router.post('/register',upload.single("profilePic"),registerUser);
router.post('/login',loginUser);

router.get('/getAllUsers',getAllUsers)
 router.get('/counts',getUserCount)

router.delete('/:id',deleteUser);
router.get('/:id',getUser)
 router.put('/:id',upload.single("profilePic"),updateUser);


module.exports=router;