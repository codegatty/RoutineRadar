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
        <div className='flex flex-row'>
        <h1 className=" flex-1 text-2x text-white font-bold text-center"> {routine?.goal}</h1>

        <div className="flex-1 bg-yellow-900 p-1 rounded-lg flex flex-row justify-center items-center text-white font-bold ">
            <span className="flex-1 text-sm">Score: </span>
            <span className="flex-1">{routine?.score}</span>
          </div>

        </div>

      </div>
      <Hr />
      <ul className="mt-3 pb-32 text-white font-bold h-screen overflow-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary">
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
