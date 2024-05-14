import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import ListOfTasks from './ListOfTasks'
import ListOfSubTasks from './ListOfSubTasks'
import InputErrorDisplay from '../UIComponents/InputErrorDisplay'
import { RoutineContext } from '../context/RoutineProvider'
import { axios_public } from '../axios_config/axiosConfig'
function SubTaskForm({onSelectIndex}) {
  const routineCtx = useContext(RoutineContext)

  const [subTaskIndex, setSubTaskIndex] = useState(-1)
  const [taskIndex, setTaskIndex] = useState(-1)
  const [shouldUpdate,setShouldUpdate] = useState(false)

 
  let selectedSubTask=routineCtx.routine.tasks[taskIndex]?.subTasks
  if(subTaskIndex!==-1){
    selectedSubTask=routineCtx.routine.tasks[taskIndex]?.subTasks[subTaskIndex]
  }else{
    selectedSubTask=[]
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({values:{
    description:shouldUpdate?selectedSubTask?.description:"",
    weightage:shouldUpdate?selectedSubTask?.weightage:""
  }});

 


  async function submitHandler(data) {
     const taskId=routineCtx.routine.tasks[taskIndex]._id
    const userId=routineCtx.routine.userId
    try{
      if(shouldUpdate){
        const subTaskId=routineCtx.routine.tasks[taskIndex].subTasks[subTaskIndex]._id
        const response=await axios_public.put(`/task/sub_task/update/${userId}`,{...data,taskId,subTaskId});
        routineCtx.updateSubTask(taskIndex,subTaskIndex,data);
        setShouldUpdate(false)
      }else{
        const response=await axios_public.put(`/task/sub_task/add/${userId}`,{...data,taskId});
        routineCtx.addSubTask(taskIndex, {...data,_id:response.data._id})
      }

    }catch(error){
      console.log(error)
    }
  }

async function deleteHandler(){
    try{
      const taskId=routineCtx.routine.tasks[taskIndex]._id
      const userId=routineCtx.routine.userId
      const subTaskId=routineCtx.routine.tasks[taskIndex].subTasks[subTaskIndex]._id

      const response=await axios_public.put(`/task/sub_task/delete/${userId}`,
      {taskId:taskId, subTaskId:subTaskId});

      routineCtx.deleteSubTask(taskIndex,subTaskIndex)
      setShouldUpdate(false)
      
    }catch(error){
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
    setShouldUpdate(true);
  }

  function addSubTaskHandler(){
    setShouldUpdate(false)
  }


  return (
    <div>

      {/* lists the tasks and subtasks */}
      <div className="flex flex-row border border-1 justify-around ">
        <ListOfTasks onSelect={onSelect} />
        
        {taskIndex === -1? '' : <ListOfSubTasks taskIndex={taskIndex} onSelect={onSelectHandler}/>}
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
          {
            shouldUpdate?<div>
                      <button className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold" type="submit">
                      {isSubmitting ? 'Loading..' : 'Update subTask'}
                    </button>
                    <button className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold" onClick={deleteHandler} >
                      {isSubmitting ? 'Loading..' : 'Delete subTask'}
                    </button>

                    <button className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold" onClick={addSubTaskHandler}>
                      {isSubmitting ? 'Loading..' : 'Add subTask'}
                    </button>
            </div>:
                      <button className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold" type="submit">
                      {isSubmitting ? 'Loading..' : 'Add subTask'}
                    </button>
          }

      </form>}
    </div>
  )
}

export default SubTaskForm
