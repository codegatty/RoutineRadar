import React from 'react'

function TaskItem(){
  return (
    <div className='flex flex-row justify-center items-center '>
      <div className='flex-2'>
        <input type="checkbox" value="hello"/>
      </div>
      <div className='flex-1 px-1'>
        <span>title</span>
      </div>
    </div>
  )
}

export default TaskItem
