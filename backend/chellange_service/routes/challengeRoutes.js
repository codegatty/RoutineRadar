const express= require('express');
const router=express.Router();
const {challengeCREDConsumer}=require("../rabbitMq/challenge_cred_consumer")

//controllers
const { getChallengeCount}=require('../controller/challengeController');

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

// router.get('/',tokenValidator,getChallenges);

// router.post('/',tokenValidator,createChallenge);

// router.put('/:id',tokenValidator,updateChallenge);

// router.delete('/:id',tokenValidator,deleteChallenge);

// router.get('/test',test)

router.get("/count",getChallengeCount);

module.exports=router;