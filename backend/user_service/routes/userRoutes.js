const express= require('express');
const router=express.Router();
const upload= require('../middleware/multerUpload')


//user-defined middleware
 const tokenValidator = require('../middleware/tokenValidator');
const {deleteUser,loginUser,registerUser,updateUser,getAllUsers,getUserCount,getUser,refresh,logout}=require('../controller/userController');

router.post('/register',upload.single("profilePic"),registerUser);
router.post('/login',loginUser);
router.get('/logout',tokenValidator,logout)
router.post('/refresh',refresh);

router.get('/getAllUsers',getAllUsers)
 router.get('/counts',getUserCount)
 router.get('/currentUser',tokenValidator,getUser)

router.delete('/:id',tokenValidator,deleteUser);
// router.get('/:id',getUser)
 router.put('/:id',tokenValidator,upload.single("profilePic"),updateUser);


module.exports=router;