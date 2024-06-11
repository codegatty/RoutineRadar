const express = require("express");
const router = express.Router();

//controllers
const {
  getChallengeCount,
  getChallenges,
  getChallengesById,
  createChallenge,
  deleteChallenge,
  updateChallenge,
} = require("../controller/challengeController");

//user-defined middleware
const tokenValidator = require("../middleware/tokenValidator");

router.get("/", getChallenges);

router.post("/", createChallenge);

router.get("/count", getChallengeCount);

router.get("/:id", getChallengesById);

router.put("/:id", updateChallenge);

router.delete("/:id", deleteChallenge);

module.exports = router;
