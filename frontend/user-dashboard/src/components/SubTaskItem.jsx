import {useState,useContext} from 'react'
import { Checkbox } from '@headlessui/react'
import { RoutineContext } from '../context/RoutineProvider'
import {axios_public} from '../axios_config/axiosConfig'

function SubTaskItem({subTask,userId,taskId}) {
  const routineCtx=useContext(RoutineContext);
  const [enabled, setEnabled] = useState(subTask.isCompleted)

 async function updateIsCompleted(){
    setEnabled(!enabled)
    const data={
      taskId,
      subTaskId:subTask._id,
      isCompleted:!enabled
    }
    
    try{
      routineCtx.updateSubTaskIsCompleted(taskId,subTask._id)
      const response=await axios_public.put(`/task/sub_task/update/is_complete/${userId}`,data)
      
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='flex flex-row justify-around items-center'>

      <div className='flex-2 p-1'>

      <Checkbox
          checked={enabled}
          onChange={updateIsCompleted}
          className=" group block size-5 rounded border bg-white data-[checked]:bg-secondary"
        >
          <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Checkbox>

      </div>

      <span className='flex-1 p-1'>{subTask.description}</span>
    </div>
  )
}

export default SubTaskItem
