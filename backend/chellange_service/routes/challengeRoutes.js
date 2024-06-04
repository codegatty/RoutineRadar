const express= require('express');
const router=express.Router();


//controllers
const { getChallengeCount,getChallenges,getChallengesById}=require('../controller/challengeController');

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

 router.get('/',getChallenges);
 router.get('/:id',getChallengesById);

// router.post('/',tokenValidator,createChallenge);

// router.put('/:id',tokenValidator,updateChallenge);

// router.delete('/:id',tokenValidator,deleteChallenge);

// router.get('/test',test)

router.get("/count",getChallengeCount);

module.exports=router;