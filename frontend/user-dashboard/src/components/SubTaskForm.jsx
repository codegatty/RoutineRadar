import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import ListOfTasks from './ListOfTasks'
import ListOfSubTasks from './ListOfSubTasks'
import InputErrorDisplay from '../UIComponents/InputErrorDisplay'
import { RoutineContext } from '../context/RoutineProvider'
function SubTaskForm() {
  const routineCtx = useContext(RoutineContext)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()
  const [taskIndex, setTaskIndex] = useState(-1)
  function submitHandler(data) {
    routineCtx.addSubTask(taskIndex, data)
    
    //TODO:send data to backend
  }

  function onSelect(index) {
    setTaskIndex(index)
  }

  return (
    <div>

      {/* lists the tasks and subtasks */}
      <div className="flex flex-row border border-1 justify-around ">
        <ListOfTasks onSelect={onSelect} />
        {taskIndex === -1 ? '' : <ListOfSubTasks taskIndex={taskIndex} />}
      </div>


      {/* form for the subTask creation  */}

      {taskIndex!==-1&&<form onSubmit={handleSubmit(submitHandler)} className="m-1">
        <h1 className='text-center text-2xl'>Add New SubTask</h1>
        <input
          {...register('description', {
            required: 'description required',
            minLength: {
              value: 5,
              message: 'description should be at least 5 characters'
            }
          })}
          className="p-2 m-5 bg-neutral-300 "
          type="text"
          placeholder="Enter the title for task"
        />
        {errors.description && <InputErrorDisplay>{errors.description.message}</InputErrorDisplay>}

        <input
          {...register('weightage', {
            required: ' weightage required'
          })}
          className="p-2 m-5 bg-neutral-300 "
          type="number"
          aria-label="Time"
          placeholder="Enter the weightage for task"
        />

        {errors.weightage && <InputErrorDisplay>{errors.weightage.message}</InputErrorDisplay>}

        <button className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold" type="submit">
          {isSubmitting ? 'Loading..' : 'create'}
        </button>
      </form>}
    </div>
  )
}

export default SubTaskForm
