import React from 'react'
import { useContext } from 'react'
import { RoutineContext } from '../context/RoutineProvider'


function ListOfSubTasks({taskIndex}) {
  const routineCtx=useContext(RoutineContext);
  const routine=routineCtx.routine;
  const subTasks=routine.tasks[taskIndex].subTasks
  return (
    <div className='border border-1'>
        {/* <ul className='text-red-500'>
        {subTasks.map(
          (item,index)=><li key={index}>{item.description}</li>
        )}
      </ul> */}
      <CustomList items={subTasks} />
    </div>
  )
}

export default ListOfSubTasks
