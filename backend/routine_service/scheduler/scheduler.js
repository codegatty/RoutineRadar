const Routine=require("../model/routineModel")
const schedule = require('node-schedule');

const job = schedule.scheduleJob('0 0 * * *', ()=>{
    console.log('isCompleted is disabled automatically')

    const response2 = Routine.updateMany(
      {}, // Matches all documents
      {
        $set: {
          "tasks.$[task].isCompleted": false,
          "tasks.$[task].subTasks.$[subTask].isCompleted": false
        }
      },
      {
        arrayFilters: [
          { "task._id": { $exists: true } }, // Filter for tasks array elements
          { "subTask._id": { $exists: true } } // Filter for subTasks array elements
        ]
      }
    )
    .then(() => {
      console.log('isCompleted is disabled automatically');
    })
    .catch((error) => {
      console.log("something went wrong in scheduler query", error);
    });

  });



  module.exports = {job}