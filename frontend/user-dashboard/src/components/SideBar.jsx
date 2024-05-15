import React from 'react'
import Hr from '../UIComponents/Hr'
import TaskItem from './TaskItem'


function SideBar({sidebarToggle,routine,selectedTaskId}) {

  function selectHandler(taskId){
    selectedTaskId(taskId)
  }
  
  return (
    <div className={'w-72 px-4 py-4 '+`${sidebarToggle?"block":"hidden"}`}>
      <div className='my-2 mb-4 '>
        <h1 className='text-2x text-white font-bold text-center'> {routine?.goal}</h1>
      </div>
      <Hr/>
      <ul className='mt-3 text-white font-bold'>

        {
          (routine?.tasks ?? []).map((task,index)=>{
            return <TaskItem task={task} userId={routine?.userId} key={index} onClick={selectHandler.bind(this,task._id)}/>
            
          })
        }
        
      </ul>
    </div>
  )
}

export default SideBar
