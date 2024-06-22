const asyncHandler = require("express-async-handler");
const Challenge = require("../model/challengeModel");
const weekStarterEnderFinder = require("../utils/weekStarterAndEnder");

//@desc get all chellanges based on admin
//@route GET /challenge
//@access public
const getChallengesForUser = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find({},{createdBy:0,createdAt:0,updatedAt:0,__v:0});
  res.status(200).json(challenges);
});

const getChallengesForAdmin = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find({},{__v:0});
  res.status(200).json(challenges);
});

//@desc get all chellanges based on admin
//@route GET /challenge
//@access public
const getChallengesById = asyncHandler(async (req, res) => {
  const challengeId=req.params.id
  const challenge = await Challenge.find({_id:challengeId},{createdBy:0,createdAt:0,updatedAt:0,__v:0});
  if(!challenge || challenge.length==0){
    return res.status(400).json({message:"no challenge found"})
  }
  await Challenge.updateOne({_id: challengeId}, {$inc: {participentCounts:1}})
  return res.status(200).json(challenge);
});

//@desc create a new challenge
//@route POST /challenge
//@access public
const createChallenge = asyncHandler(async (req, res) => {
  const { name, type, duration, weightage, description,createdBy } = req.body;

  if (!name || !type || !duration || !weightage || !description) {
    return res.status(400).json({ msg: "Please fill all the fields" });
  }
  const challenge = await Challenge.create({
    name,
    type,
    duration,
    weightage,
    description,
    createdBy: createdBy,
  });

  if (challenge) {
    return res.status(201).json(challenge);
  } else {
    return res.status(400).json({ msg: "challenge could not be created" });
  }
});

//@desc delete a challenge
//@route DELETE /challenge/id
//@access public
const deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ msg: "challenge not found" });
  }

  await Challenge.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "deletion successful" });
});

//@desc update a challenge
//@route PUT /challenge
//@access public
const updateChallenge = asyncHandler(async (req, res) => {
  const { name, type, duration, weightage, description } = req.body;

  if (!name || !type || !duration || !weightage || !description) {
    return res.status(400).json({ msg: "Please fill all the fields" });
  }

  const challenge = await Challenge.findByIdAndUpdate(
    req.params.id,
    {
      name,
      type,
      duration,
      weightage,
      description
    },
    { new: true }
  );

  return res.status(200).json(challenge);
});

const test = asyncHandler(async (req, res) => {
  return res.send("all fine");
});

//@desc gets the count of challenges
//@route GET /challenge/count
//@access public

const getChallengeCount = asyncHandler(async (req, res) => {
  const [startDate, endDate] = weekStarterEnderFinder();
  const challengeCount = await Challenge.estimatedDocumentCount();
  const dayWiseCount = await Challenge.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $gte: ["$createdAt", startDate] },
            { $lt: ["$createdAt", endDate] },
          ],
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  let arr = [0, 0, 0, 0, 0, 0, 0];

  const day = startDate.getDate();
  dayWiseCount.map((ele) => {
    arr[Math.floor(ele._id % day)] = ele.count;
  });

  if (!challengeCount) return res.status(400).send({ message: "bad request" });

  res.status(200).json({ challengeCount: challengeCount,barDataSet:arr});
});

  const updateParticipantsCount = asyncHandler(async (req, res) => {
    const challengeId = req.params.id;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ msg: "challenge not found" });
    }
    
    await Challenge.updateOne({_id: challengeId}, {$set: {participentCounts: challenge.participentCounts+1}})
    res.status(200).json({message:"participants count incremented"})
  })

module.exports = {
  getChallengesForAdmin,
  getChallengesForUser,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  test,
  getChallengeCount,
  getChallengesById,
  updateParticipantsCount
};
