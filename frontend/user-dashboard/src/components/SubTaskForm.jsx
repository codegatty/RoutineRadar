import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import ListOfTasks from './ListOfTasks'
import ListOfSubTasks from './ListOfSubTasks'
import InputErrorDisplay from '../UIComponents/InputErrorDisplay'
import { RoutineContext } from '../context/RoutineProvider'
import { axios_public } from '../axios_config/axiosConfig'
function SubTaskForm({ onSelectIndex }) {
  const inputClasses = 'p-2 m-5 bg-secondary rounded-2xl text-primary text-sm font-semibold'
  const buttonClasses =
    'p-2 m-5 bg-app-blue hover:bg-secondary hover:text-primary rounded-xl text-secondary font-semibold'

  const routineCtx = useContext(RoutineContext)

  const [subTaskIndex, setSubTaskIndex] = useState(-1)
  const [taskIndex, setTaskIndex] = useState(-1)
  const [shouldUpdate, setShouldUpdate] = useState(false)

  let selectedSubTask = routineCtx?.routine?.tasks[taskIndex]?.subTasks
  let taskTitle=""
  let subTaskTitle=""
  if (subTaskIndex !== -1) {
    selectedSubTask = routineCtx?.routine?.tasks[taskIndex]?.subTasks[subTaskIndex]
    taskTitle=routineCtx?.routine?.tasks[taskIndex]?.title
    subTaskTitle=selectedSubTask?.description
  } else {
    selectedSubTask = []
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    values: {
      description: shouldUpdate ? selectedSubTask?.description : '',
      weightage: shouldUpdate ? selectedSubTask?.weightage : ''
    }
  })

  async function submitHandler(data) {
    const taskId = routineCtx.routine.tasks[taskIndex]._id
    const userId = routineCtx.routine.userId

     //?this calculate the total subtask weightage to convert task weightage to subtask weightage
    // let total_weightage = routineCtx.routine.tasks[taskIndex].subTasks.reduce((acc, curr) => {
    //   return parseInt(acc) + parseInt(curr.weightage)
    // }, 0)
    // total_weightage += parseInt(data.weightage)

    try {
      if (shouldUpdate) {
         const subTaskId = routineCtx.routine.tasks[taskIndex].subTasks[subTaskIndex]._id
         const response = await axios_public.put(`/task/sub_task/update/${userId}`, { ...data, taskId, subTaskId })
         routineCtx.updateSubTask(taskIndex, subTaskIndex, { ...data })
         setShouldUpdate(false)
      } else {
        const response = await axios_public.put(`/task/sub_task/add/${userId}`, { ...data, taskId })
        routineCtx.addSubTask(taskIndex,response.data)
        setShouldUpdate(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteHandler() {
    try {
      const taskId = routineCtx.routine.tasks[taskIndex]._id
      const userId = routineCtx.routine.userId
      const subTaskId = routineCtx.routine.tasks[taskIndex].subTasks[subTaskIndex]._id

      const response = await axios_public.put(`/task/sub_task/delete/${userId}`, {
        taskId: taskId,
        subTaskId: subTaskId
      })

      routineCtx.deleteSubTask(taskIndex, subTaskIndex)
      setShouldUpdate(false)
    } catch (error) {
      console.log(error)
    }
  }

  //? updates when we select one of the task in tasks list
  function onSelect(index) {
    setTaskIndex(index)
    onSelectIndex(index)
  }

  function onSelectHandler(index) {
    setSubTaskIndex(index)
    setShouldUpdate(true)
  }

  function addSubTaskHandler() {
    setShouldUpdate(false)
  }

  return (
    <div className=' flex flex-col h-full'>
      {/* lists the tasks and subtasks */}
      <div className="flex-1 flex flex-row justify-around mt-16 w-full ">
        <ListOfTasks onSelect={onSelect} />

        {taskIndex !== -1 && <ListOfSubTasks taskIndex={taskIndex} onSelect={onSelectHandler} />}
      </div>

      {/* form for the subTask creation  */}

      {taskIndex !== -1 && (
        <div className='flex-1 flex item-center justify-center '>
        <form onSubmit={handleSubmit(submitHandler)} className="m-1  flex flex-col w-96 ">
          <h1 className="text-primary text-3xl text-center mt-5">Sub Task</h1>
          <h2 className="text-primary text-md text-center ">({taskTitle+">"+subTaskTitle})</h2>
          <input
            {...register('description', {
              required: 'description required',
              minLength: {
                value: 5,
                message: 'description should be at least 5 characters'
              }
            })}
            className={inputClasses}
            type="text"
            placeholder="Enter the title for task"
          />
          {errors.description && <InputErrorDisplay>{errors.description.message}</InputErrorDisplay>}

          {/* <input
            {...register('weightage', {
              required: ' weightage required'
            })}
            className={inputClasses}
            type="number"
            aria-label="Time"
            placeholder="Enter the weightage for task"
          />

          {errors.weightage && <InputErrorDisplay>{errors.weightage.message}</InputErrorDisplay>} */}
          {shouldUpdate ? (
            <div className='flex flex-row justify-around items-center'>
              <button className={buttonClasses} type="submit">
                {isSubmitting ? 'Loading..' : 'Update'}
              </button>
              <button className={buttonClasses} onClick={deleteHandler}>
                {isSubmitting ? 'Loading..' : 'Delete'}
              </button>

              <button className={buttonClasses} onClick={addSubTaskHandler}>
                {isSubmitting ? 'Loading..' : 'Add'}
              </button>
            </div>
          ) : (
            <button className={buttonClasses} type="submit">
              {isSubmitting ? 'Loading..' : 'Add'}
            </button>
          )}
        </form>
        </div>
      )}
    </div>
  )
}

export default SubTaskForm
