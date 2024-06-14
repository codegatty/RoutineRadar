const express = require("express");
const router = express.Router();

//controllers
const {
  getChallengeCount,
  getChallengesForAdmin,
  getChallengesForUser,
  getChallengesById,
  createChallenge,
  deleteChallenge,
  updateChallenge,
  updateParticipantsCount
} = require("../controller/challengeController");

//user-defined middleware
const tokenValidator = require("../middleware/tokenValidator");

router.get("/", getChallengesForUser);

router.post("/", createChallenge);

router.get("/count", getChallengeCount);

router.get("/detailed",getChallengesForAdmin);

router.put("/participentCount/:id",updateParticipantsCount);

router.get("/:id", getChallengesById);

router.put("/:id", updateChallenge);

router.delete("/:id", deleteChallenge);


module.exports = router;
