const express= require('express');
const router=express.Router();

const {getChallenges,updateChallengeId,onCompleteChallenge}=require("../controller/challengeContorller")


router.put("/on_complete/:id",onCompleteChallenge)
router.get("/:id",getChallenges)
router.put("/:id",updateChallengeId)

module.exports=router;