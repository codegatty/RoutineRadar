import React from 'react'

function SubTaskItem({subTask}) {
  return (
    <div>
      <input type="checkbox"/>
      <span>{subTask.description}</span>
    </div>
  )
}

export default SubTaskItem
