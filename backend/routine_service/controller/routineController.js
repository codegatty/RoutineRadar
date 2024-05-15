const asyncHandler = require("express-async-handler");
const Routine = require("../model/routineModel");


//desc create a new routine
//@route POST /routine
//@access private
const createRoutine = asyncHandler(async (req, res) => {
  const response = await Routine.create(req.body);
  if(response){
    return res.status(201).json(response);
  }else{
    return res.status(400).json({msg:"couldn't create routine"});
  }
 
});

//@desc delete routine
//@route DELETE /routine/user_id
//@access private
const deleteRoutine = asyncHandler(async (req, res) => {

  const response = await Routine.deleteOne({ userId: req.params.id });
  if(!response){
    return res.status(404).json({msg:"couldn't delete"});
  }
  res.status(200).json(response);
});

//@desc update the routine
//@route PUT /routine/user_id
//@access private
const updateRoutine = asyncHandler(async (req, res) => {
  const { goal, type } = req.body;
  const routine=await Routine.findOne({userId:req.params.id})
  if(!routine){
    return res.status(404).json({msg:"routine not found"});
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

  const lengthOfTasks=response.tasks.length;
  const filteredResponse=response.tasks[lengthOfTasks-1];
  if(lengthOfTasks>=0)
    return res.json(filteredResponse);
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
  const { taskId, description, weightage } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, tasks: { $elemMatch: { _id: taskId } } },
    {
      $push: {
        "tasks.$.subTasks": { description, weightage},
      },
    },
    { new: true }
  );
  if(response){
  const currentTask = response.tasks.filter((task)=>task.id ===taskId);
  const lengthOfSubTasks=currentTask[0].subTasks.length;
  
  return res.json(currentTask[0].subTasks[lengthOfSubTasks-1]);
  }
  return response
});


//@desc update an sub task in specific task
//@route POST /routine/task/sub_task/update/user_id
//@access private
const updateSubTask = asyncHandler(async (req, res) => {
  const { description, weightage, taskId, subTaskId } = req.body;

  const response = await Routine.findOneAndUpdate({userId: req.params.id,
    'tasks._id': taskId},{
      $set: {
         'tasks.$[task].subTasks.$[subTask].description': description,
         'tasks.$[task].subTasks.$[subTask].weightage':weightage 
      }
    },  {
      arrayFilters: [{ 'task._id':taskId }, { 'subTask._id': subTaskId }],
      new: true
    });

    //?if something went wrong change the array filter task to some  other identifier
    res.json(response)
  })


//@desc delete an subTask from task
//@route PUT /routine/task/sub_task/user_id
//@access private
  const deleteSubTask=asyncHandler(async (req,res)=>{
    const{taskId,subTaskId}=req.body;
    const response = await Routine.findOneAndUpdate(
      { userId: req.params.id,
        'tasks._id': taskId },
      {
        $pull: {
          "tasks.$.subTasks": {_id:subTaskId },
        },
      },
      { new: true }
    );
    res.json(response)
  })


//@desc create a new challenge
//@route GET /routine
//@access public
const getRoutine = asyncHandler(async (req, res) => {
  const response = await Routine.find({ userId: req.params.id });
  res.status(200).json(response);
});


const updateTaskIsCompleted=asyncHandler(async (req, res) => {
  const { taskId,isCompleted } = req.body;
 
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, tasks: { $elemMatch: { _id: taskId } } },
    {
      $set: {
        "tasks.$.isCompleted": isCompleted
      },
    },
    { new: true }
  );

  res.json(response);
})

const updateSubTaskIsCompleted=asyncHandler(async (req, res) => {

  const {  taskId, subTaskId,isCompleted } = req.body;

  const response = await Routine.findOneAndUpdate({userId: req.params.id,
    'tasks._id': taskId},{
      $set: {
         'tasks.$[task].subTasks.$[subTask].isCompleted': isCompleted
      }
    },  {
      arrayFilters: [{ 'task._id':taskId }, { 'subTask._id': subTaskId }],
      new: true
    });

    //?if something went wrong change the array filter task to some  other identifier
    res.json(response)

})

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
  updateTaskIsCompleted
};
