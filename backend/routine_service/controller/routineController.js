const asyncHandler = require("express-async-handler");
const Routine = require("../model/routineModel");
const ArchivedRoutine=require("../model/archivedRoutineModel")
const {addDaysBadges,addScoreBadges}=require("../util/badgeFunction")
const axios=require('axios')

const user_service_url=process.env.USER_SERVICE

//desc create a new routine
//@route POST /routine
//@access private
const createRoutine = asyncHandler(async (req, res) => {
  const response = await Routine.create(req.body);
  if (response) {
    return res.status(201).json(response);
  } else {
    return res.status(400).json({ msg: "couldn't create routine" });
  }
});

//@desc delete routine
//@route DELETE /routine/user_id
//@access private
const deleteRoutine = asyncHandler(async (req, res) => {
  const currentRoutine=await Routine.findOne({userId: req.params.id},{_id:0,__v:0,updatedAt:0,createdAt:0})

  const response = await Routine.deleteOne({ userId: req.params.id });
  if ( !createRoutine && !response) {
    return res.status(404).json({ msg: "couldn't delete" });
  }
  //?add routine to archived routines
  const data={
    goal:currentRoutine.goal,
    type:currentRoutine.type,
    userId:req.params.id,
    tasks:currentRoutine.tasks,
    score:currentRoutine.score,
    badges:currentRoutine.badges,
  }
  //?added to archived routines
 await ArchivedRoutine.create(data)
  res.status(200).json(response);
});

//@desc update the routine
//@route PUT /routine/user_id
//@access private
const updateRoutine = asyncHandler(async (req, res) => {
  const { goal, type } = req.body;
  const routine = await Routine.findOne({ userId: req.params.id });
  if (!routine) {
    return res.status(404).json({ msg: "routine not found" });
  }
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id },
    { $set: { goal: goal, type: type } },
    { new: true }
  );
  res.status(200).json(response);
});

//@desc add new task in routine
//@route POST /challenge/task/user_id
//@access private
const addTask = asyncHandler(async (req, res) => {
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id },
    { $push: { tasks: req.body } },
    { new: true }
  );

  const lengthOfTasks = response.tasks.length;
  const filteredResponse = response.tasks[lengthOfTasks - 1];
  if (lengthOfTasks >= 0) return res.json(filteredResponse);
  return res.json(response);
});

//@desc update the task
//@route PUT /routine/task/add/user_id
//@access private
const updateTask = asyncHandler(async (req, res) => {
  const { taskId, title, startTime, endTime, weightage } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, tasks: { $elemMatch: { _id: taskId } } },
    {
      $set: {
        "tasks.$.title": title,
        "tasks.$.startTime": startTime,
        "tasks.$.endTime": endTime,
        "tasks.$.weightage": weightage,
      },
    },
    { new: true }
  );

  res.json(response);
});

//@desc delete and task
//@route PUT /routine/task/user_id
//@access private
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.body;

  const response = await Routine.findOneAndUpdate(
    {
      userId: req.params.id, // Assuming you have the user ID in req.params.id
    },
    {
      $pull: {
        tasks: { _id: taskId }, // Remove the routine with the specified order number
      },
    },
    { new: true } // Return the updated document
  );
  res.json(response);
});

//@desc add an subtask for task
//@route POST /routine/task/sub_task/user_id
//@access private
const addSubTask = asyncHandler(async (req, res) => {
  const { taskId, description } = req.body;

  //?pushing the new subTask
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, tasks: { $elemMatch: { _id: taskId } } },
    {
      $push: {
        "tasks.$.subTasks": { description, weightage:100 },
      },
    },
    { new: true }
  );

  // const result = await Routine.findOne(
  //   { userId: req.params.id, "tasks._id": taskId },
  //   { "tasks.$": 1 } // Project only the specific task
  // );

  if ( response) {
    const currentTask = response.tasks.filter((task) => task.id === taskId);
    const lengthOfSubTasks = currentTask[0].subTasks.length;
    //const subTasksLength = result.tasks[0].subTasks.length;
    let weightage = 100 / lengthOfSubTasks;

    //?updating the weightage of each subTask to newWeightage calculated using no of subtasks
    const response2 = await Routine.findOneAndUpdate(
      { userId: req.params.id, "tasks._id": taskId },
      {
        $set: {
          "tasks.$[task].subTasks.$[subTask].weightage": weightage,
        },
      },
      {
        arrayFilters: [
          { "task._id": taskId },
          { "subTask._id": { $exists: true } },
        ],
        new: true,
      }
    );
    const currentTask2 = response2.tasks.filter((task) => task.id === taskId);
    return res.json(currentTask2[0].subTasks[lengthOfSubTasks - 1]);
  }

  return res.json(response);
});

//@desc update an sub task in specific task
//@route POST /routine/task/sub_task/update/user_id
//@access private
const updateSubTask = asyncHandler(async (req, res) => {
  const { description,taskId, subTaskId } = req.body;

  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, "tasks._id": taskId },
    {
      $set: {
        "tasks.$[task].subTasks.$[subTask].description": description,
      },
    },
    {
      arrayFilters: [{ "task._id": taskId }, { "subTask._id": subTaskId }],
      new: true,
    }
  );

  //?if something went wrong change the array filter task to some  other identifier
  res.json(response);
});

//@desc delete an subTask from task
//@route PUT /routine/task/sub_task/user_id
//@access private
const deleteSubTask = asyncHandler(async (req, res) => {
  const { taskId, subTaskId } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, "tasks._id": taskId },
    {
      $pull: {
        "tasks.$.subTasks": { _id: subTaskId },
      },
    },
    { new: true }
  );

  const result = await Routine.findOne(
    { userId: req.params.id, "tasks._id": taskId },
    { "tasks.$": 1 } // Project only the specific task
  );

  if(result && response){

    const subTasksLength = result.tasks[0].subTasks.length;
    let weightage = 100 / subTasksLength ;
    
    //?updating the weightage of each subTask to newWeightage calculated using no of subtasks
    const response2 = await Routine.findOneAndUpdate(
      { userId: req.params.id, "tasks._id": taskId },
      {
        $set: {
          "tasks.$[task].subTasks.$[subTask].weightage": weightage,
        },
      },
      {
        arrayFilters: [
          { "task._id": taskId },
          { "subTask._id": { $exists: true } },
        ],
        new: true,
      }
    );
  }


  res.json(response);
});

//@desc create a new challenge
//@route GET /routine
//@access public
const getRoutine = asyncHandler(async (req, res) => {
  let response = await Routine.find({ userId: req.params.id });
  //?adds the badge
  if(response && response.length>0){
  addDaysBadges(response)
  addScoreBadges(response)
  }
  response = await Routine.find({ userId: req.params.id });

  res.status(200).json(response);
});

const updateTaskIsCompleted = asyncHandler(async (req, res) => {
  const { taskId, isCompleted, score } = req.body;
  const curr_score = await Routine.findOne(
    { userId: req.params.id },
    { score: 1, _id: 0 }
  );
  const new_score = curr_score.score + score;

  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, tasks: { $elemMatch: { _id: taskId } } },
    {
      $set: {
        "tasks.$.isCompleted": isCompleted,
        score: new_score,
      },
    },
    { new: true }
  );

  axios.put(`${user_service_url}/user/analytics/${req.params.id}`,{score:score}).then(()=>{
    return  res.status(200).json(response);
  }).catch((err)=>{
    console.log(err)
    return res.status(400).json("something went wrong while update the task complition")
  })

});

const updateSubTaskIsCompleted = asyncHandler(async (req, res) => {
  const { taskId, subTaskId, isCompleted } = req.body;

  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, "tasks._id": taskId },
    {
      $set: {
        "tasks.$[task].subTasks.$[subTask].isCompleted": isCompleted,
      },
    },
    {
      arrayFilters: [{ "task._id": taskId }, { "subTask._id": subTaskId }],
      new: true,
    }
  );

  //?if something went wrong change the array filter task to some  other identifier
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
  deleteSubTask,
  updateSubTaskIsCompleted,
  updateTaskIsCompleted,
};
