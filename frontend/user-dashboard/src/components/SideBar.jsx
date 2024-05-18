import React from 'react'
import Hr from '../UIComponents/Hr'
import TaskItem from './TaskItem'

function SideBar({ sidebarToggle, routine, selectedTaskId }) {
  function selectHandler(taskId) {
    selectedTaskId(taskId)
  }

  return (
    <>
    {
      routine?
    <div className={'w-72 px-4 py-4 ' + `${sidebarToggle ? 'block' : 'hidden'}`}>
      <div className="my-2 mb-4 ">
        <h1 className="text-2x text-white font-bold text-center"> {routine?.goal}</h1>
      </div>
      <Hr />
      <ul className="mt-3 text-white font-bold">
        {(routine?.tasks ?? []).map((task, index) => {
          return (
            <TaskItem task={task} userId={routine?.userId} key={index} onClick={selectHandler.bind(this, task._id)} />
          )
        })}
      </ul>
    </div>
    :<div className={'w-72 h-full px-4 py-4 flex  justify-center items-center ' + `${sidebarToggle ? 'block' : 'hidden'}`}>
      <h1 className='flex-1 font-bold text-secondary text-xl'>No Routine Found</h1>
    </div>
}
    </>
  )
}

export default SideBar
