import React from 'react'

function SubTaskItem({subTask}) {
  console.log()
  return (
    <div>
      <input type="checkbox" checked={subTask.isCompleted}/>
      <span>{subTask.description}</span>
    </div>
  )
}

export default SubTaskItem
