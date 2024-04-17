const asyncHanlder = require("express-async-handler");
const Routine = require("../model/routineModel");

const createRoutine = asyncHanlder(async (req, res) => {
  const response = await Routine.create(req.body);
  res.json(response);
});

const deleteRoutine = asyncHanlder(async (req, res) => {
  const response = await Routine.deleteOne({ userId: req.params.id });
  res.json(response);
});

const updateRoutine = asyncHanlder(async (req, res) => {
  const { goal, type } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id },
    { $set: { goal: goal, type: type } },
    { new: true }
  );
  res.json(response);
});

const addTask = asyncHanlder(async (req, res) => {
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id },
    { $push: { routine: req.body } },
    { new: true }
  );
  res.json(response);
});

const updateTask = asyncHanlder(async (req, res) => {
  const { order, title, startTime, endTime, weightage } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, routine: { $elemMatch: { order: order } } },
    {
      $set: {
        "routine.$.title": title,
        "routine.$.startTime": startTime,
        "routine.$.endTime": endTime,
        "routine.$.weightage": weightage,
      },
    },
    { new: true }
  );
  res.json(response);
});

const deleteTask = asyncHanlder(async (req, res) => {
  const { order } = req.body;

  const response = await Routine.findOneAndUpdate(
    {
      userId: req.params.id, // Assuming you have the user ID in req.params.id
    },
    {
      $pull: {
        routine: { order: order }, // Remove the routine with the specified order number
      },
    },
    { new: true } // Return the updated document
  );
  res.json(response);
});

const addSubTask = asyncHanlder(async (req, res) => {
  const { order, description, weightage, subTaskOrder } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, routine: { $elemMatch: { order: order } } },
    {
      $push: {
        "routine.$.subTasks": { description, weightage, order: subTaskOrder },
      },
    },
    { new: true }
  );
  res.json(response);
});

const updateSubTask = asyncHanlder(async (req, res) => {
  const { description, weightage, order, subTaskOrder } = req.body;

  const response = await Routine.aggregate([
    {
      $match: {
        userId: req.params.id,
        routine: { $elemMatch: { order: order } },
        "routine.subTasks": { $elemMatch: { order: subTaskOrder } },
      },
    },

    { $unwind: "$routine" },
    { $match: { "routine.order": order } },
    { $unwind: "$routine.subTasks" },
    { $match: { "routine.subTasks.order": subTaskOrder } },
    {
      $set: {
        "routine.subTasks": {
          $mergeObjects: [
            "$routine.subTasks",
            { description: description, weightage: weightage },
          ],
        },
      },
    },{
      $group:{
      _id: "$_id",
      routine: { $push: "$routine" }
      }
    }
  ]);
  res.json(response);
});

const getRoutine = asyncHanlder(async (req, res) => {
  const response = await Routine.find({ userId: req.params.id });
  res.json(response);
});

module.exports = {
  createRoutine,
  getRoutine,
  deleteRoutine,
  updateRoutine,
  addTask,
  updateTask,
  deleteTask,
  addSubTask,
  updateSubTask,
};
