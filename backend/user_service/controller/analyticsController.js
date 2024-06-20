const async_handler = require("express-async-handler");
const weekStarterEnderFinder = require("../utils/weekStarterAndEnder");
const Analytics = require("../model/analyticsModel");


const fetchAnalytics = async_handler(async (req, res) => {
  const [startDate, endDate] = weekStarterEnderFinder();
  const analytics = await Analytics.findOne({ userId: req.params.id });

  if (!analytics) {
    return res.status(400).json({ message: "no analytics found" });
  }
  const createdAt = analytics.createdAt;
  if (createdAt >= startDate && createdAt <= endDate) {
    return res.status(200).json(analytics);
  } else {
    await Analytics.deleteOne({ _id: analytics._id });
    const response = Analytics.create({ userId: req.params.id });
    return res.status(200).json(response);
  }
});

const createAnalytics = async_handler(async (userId) => {
  await Analytics.create({ userId: userId });
});

const deleteAnalytics = async_handler(async (userId) => {
  await Analytics.deleteOne({ userId: userId });
});

const updatedAnalytics = async_handler(async (req, res) => {
  const [startDate, endDate] = weekStarterEnderFinder();
  const analytics = await Analytics.findOne({ userId: req.params.id });
  const { score } = req.body;

  const currentDate = new Date();
  const diffInMilliseconds = currentDate - startDate;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  const result = await Analytics.updateOne(
    { _id: analytics._id },
    {
      $inc: { [`weeklyTaskData.${diffInDays}`]: 1 },
      $set: { weeklyScoreData: parseInt(score) + analytics.weeklyScoreData },
    },
    { new: true }
  );
  res.status(200).json({"message":"analytics updated"})
});

module.exports = {
  fetchAnalytics,
  updatedAnalytics,
  createAnalytics,
  deleteAnalytics,
};
