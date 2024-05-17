import { useState,useContext } from 'react'
import SubTaskItem from './SubTaskItem'
import Hr from '../UIComponents/Hr'
import { Checkbox } from '@headlessui/react'
import {axios_public} from '../axios_config/axiosConfig'
import { RoutineContext } from '../context/RoutineProvider'
import classnames from 'classnames'
import { FiChevronDown } from "react-icons/fi";
import { convertTo12HourFormat } from '../utility/convertTo12HourFormat'


function TaskItem({ task,userId,onClick }) {
  const routineCtx = useContext(RoutineContext);
  const [enabled, setEnabled] = useState(task.isCompleted)
  const [toggleSubTask,setToggleSubTask] = useState(false); 


  async function updateIsComplete() { 
    const taskId = task._id
    setEnabled(!enabled);
    const data={
      taskId,
      isCompleted:!enabled
    }
    
    try{
    const response=await axios_public.put(`/task/update/is_complete/${userId}`,data)
   
    routineCtx.updateTaskIsCompleted(task._id)
    }catch(error){
      console.log(error);
    }
  }

  function toggleSubTaskList(){
    setToggleSubTask(!toggleSubTask);
  }

  
  return (
    <div className="flex flex-col hover:bg-secondary p-4 rounded-xl" onClick={onClick}>
      <div className="flex flex-row justify-around items-center">

        <Checkbox
          checked={enabled}
          onChange={updateIsComplete}
          className=" flex-2 group block size-5 rounded border bg-white data-[checked]:bg-secondary"
        >
          <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Checkbox>
        
        <h4 className="flex-1 p-3">{task.title}</h4>
        <button  className='flex-2 hover:bg-secondary' onClick={toggleSubTaskList}><FiChevronDown size={25}/></button>
      </div>

      <div className="flex flex-row justify-around">
        <span className='font-semibold'>From: <span className='font-bold '>{convertTo12HourFormat(task.startsAt)}</span></span>
        <span>To: {convertTo12HourFormat(task.endsAt)}</span>
      </div>
      <div className={classnames(toggleSubTask?"block":"hidden")}>
        {task.subTasks.map((subTask, index) => {
          return <SubTaskItem key={index} subTask={subTask} taskId={task._id} userId={userId}/>
        })}
      </div>
      <Hr />
    </div>
  )
}

export default TaskItem
