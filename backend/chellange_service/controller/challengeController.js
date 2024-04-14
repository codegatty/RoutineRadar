const asyncHandler = require("express-async-handler");
const Challenge = require("../model/challengeModel");
const weekStarterEnderFinder = require("../utils/weekStarterAndEnder");

//@desc get all chellanges based on admin
//@route GET /challenge
//@access public
const getChallenges = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find();
  res.status(200).json(challenges);
});

//@desc create a new challenge
//@route POST /challenge
//@access public
const createChallenge = asyncHandler(async (req, res) => {
  const { name, type, duration, weightage, description } = req.body;

  if (!name || !type || !duration || !weightage || !description) {
    return res.status(400).json({ msg: "Please fill all the fields" });
  }
  const challenge = await Challenge.create({
    name,
    type,
    duration,
    weightage,
    description,
    createdBy: req.admin.id,
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
      description,
      createdBy: "developer",
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

module.exports = {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  test,
  getChallengeCount,
};
