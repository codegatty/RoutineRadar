const express= require('express');
const router=express.Router();
const multer=require('multer');

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

const {deleteUser,loginUser,registerUser,updateUser,getAllUsers,getUserCount}=require('../controller/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  const upload = multer({ storage: storage })


router.post('/register',upload.single("profilePic"),registerUser);

router.post('/login',loginUser);

router.delete('/:id',tokenValidator,deleteUser);

router.put('/:id',tokenValidator,updateUser);

router.get('/getAllUsers',getAllUsers)

router.get('/counts',getUserCount)

module.exports=router;