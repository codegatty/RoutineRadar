const express= require('express');
const router=express.Router();

//controllers
const {createChallenge,deleteChallenge,getChallenges,updateChallenge}=require('../controller/challengeController');

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

router.get('/',tokenValidator,getChallenges);

router.post('/',tokenValidator,createChallenge);

router.put('/:id',tokenValidator,updateChallenge);

router.delete('/:id',tokenValidator,deleteChallenge);





module.exports=router;