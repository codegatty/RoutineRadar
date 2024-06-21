const express= require('express');
const router=express.Router();

const {getChallenges,updateChallengeId,onCompleteChallenge}=require("../controller/challengeContorller")
const tokenValidator=require("../middleware/tokenValidator")

router.put("/on_complete/:id",tokenValidator,onCompleteChallenge)
router.get("/:id",tokenValidator,getChallenges)
router.put("/:id",tokenValidator,updateChallengeId)

module.exports=router;