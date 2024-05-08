import React from 'react'
import TaskItem from './TaskItem'

function Task() {
  return (
    <div>
      <div>
        time
      </div>
      <div className='ml-2'>
      <div>
        task title
      </div>
      <div>
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
      </div>
      </div>
    </div>
  )
}

export default Task
