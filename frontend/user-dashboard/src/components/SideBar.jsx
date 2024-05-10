import React from 'react'
import Hr from '../UIComponents/Hr'
import Task from '../components/Task'
import TaskItem from './TaskItem'
import {useContext} from 'react' 
import {RoutineContext} from '../context/RoutineProvider'

function SideBar({sidebarToggle}) {
  const  routineCtx=useContext(RoutineContext);
  const routine=routineCtx.routine;
  return (
    <div className={'w-64 px-4 py-4 '+`${sidebarToggle?"block":"hidden"}`}>
      <div className='my-2 mb-4 '>
        <h1 className='text-2x text-white font-bold'> {routine.goal}</h1>
      </div>
      <Hr/>
      <ul className='mt-3 text-white font-bold'>

        {
          routine.tasks.map((task,index)=>{
            return <TaskItem task={task}/>
            
          })
        }
        
      </ul>
    </div>
  )
}

export default SideBar
