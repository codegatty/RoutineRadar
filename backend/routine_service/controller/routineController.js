const asyncHanlder = require("express-async-handler");
const Routine = require("../model/routineModel");


//@desc create a new routine
//@route POST /routine
//@access private
const createRoutine = asyncHanlder(async (req, res) => {
  const response = await Routine.create(req.body);
  res.json(response);
});

//@desc delete routine
//@route DELETE /routine/user_id
//@access private
const deleteRoutine = asyncHanlder(async (req, res) => {
  const response = await Routine.deleteOne({ userId: req.params.id });
  res.json(response);
});

//@desc update the routine
//@route PUT /routine/user_id
//@access private
const updateRoutine = asyncHanlder(async (req, res) => {
  const { goal, type } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id },
    { $set: { goal: goal, type: type } },
    { new: true }
  );
  res.json(response);
});

//@desc add new task in routine
//@route POST /challenge/task/user_id
//@access private
const addTask = asyncHanlder(async (req, res) => {
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id },
    { $push: { task: req.body } },
    { new: true }
  );
  res.json(response);
});


//@desc update the task
//@route PUT /routine/task/add/user_id
//@access private
const updateTask = asyncHanlder(async (req, res) => {
  const { order, title, startTime, endTime, weightage } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, task: { $elemMatch: { order: order } } },
    {
      $set: {
        "task.$.title": title,
        "task.$.startTime": startTime,
        "task.$.endTime": endTime,
        "task.$.weightage": weightage,
      },
    },
    { new: true }
  );
  res.json(response);
});


//@desc delete and task 
//@route PUT /routine/task/user_id
//@access private
const deleteTask = asyncHanlder(async (req, res) => {
  const { order } = req.body;

  const response = await Routine.findOneAndUpdate(
    {
      userId: req.params.id, // Assuming you have the user ID in req.params.id
    },
    {
      $pull: {
        task: { order: order }, // Remove the routine with the specified order number
      },
    },
    { new: true } // Return the updated document
  );
  res.json(response);
});


//@desc add an subtask for task
//@route POST /routine/task/sub_task/user_id
//@access private
const addSubTask = asyncHanlder(async (req, res) => {
  const { order, description, weightage, subTaskOrder } = req.body;
  const response = await Routine.findOneAndUpdate(
    { userId: req.params.id, task: { $elemMatch: { order: order } } },
    {
      $push: {
        "task.$.subTasks": { description, weightage, order: subTaskOrder },
      },
    },
    { new: true }
  );
  res.json(response);
});


//@desc update an sub task in specific task
//@route POST /routine/task/sub_task/update/user_id
//@access private
const updateSubTask = asyncHanlder(async (req, res) => {
  const { description, weightage, order, subTaskOrder } = req.body;

  const response = await Routine.findOneAndUpdate({userId: req.params.id,
    'task.order': order},{
      $set: {
        'task.$[task].subTasks.$[subtask].description': description,
        'task.$[task].subTasks.$[subtask].weightage':weightage 
      }
    },  {
      arrayFilters: [{ 'task.order':order }, { 'subtask.order': subTaskOrder }],
      new: true
    });
    //if something went wrong change the arrayfilter task to some  other identifier
    res.json(response)
  })


//@desc delete an subTask from task
//@route PUT /routine/task/sub_task/user_id
//@access private
  const deleteSubTask=asyncHanlder(async (req,res)=>{
    const{order,subTaskOrder}=req.body;
    const response = await Routine.findOneAndUpdate(
      { userId: req.params.id,
        'task.order': order },
      {
        $pull: {
          "task.$.subTasks": {order:subTaskOrder },
        },
      },
      { new: true }
    );
    res.json(response)
  })


//@desc create a new challenge
//@route GET /routine
//@access public
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
  deleteSubTask
};
