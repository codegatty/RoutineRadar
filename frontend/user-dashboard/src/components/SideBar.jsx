import React from 'react'
import Hr from '../UIComponents/Hr'
import TaskItem from '../UIComponents/TaskItem'
import Task from '../UIComponents/Task'

function SideBar({sidebarToggle}) {
  return (
    <div className={'w-64 px-4 py-4 '+`${sidebarToggle?"block":"hidden"}`}>
      <div className='my-2 mb-4 '>
        <h1 className='text-2x text-white font-bold'>Goal</h1>
      </div>
      <Hr/>
      <ul className='mt-3 text-white font-bold'>

        <Task/>
      </ul>
    </div>
  )
}

export default SideBar
