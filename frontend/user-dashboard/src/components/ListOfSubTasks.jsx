import React from 'react'
import { useContext } from 'react'
import { RoutineContext } from '../context/RoutineProvider'
import ListItem from '../UIComponents/ListItem';
import Title from '../UIComponents/Title';

function ListOfSubTasks({taskIndex}) {
  const routineCtx=useContext(RoutineContext);
  const routine=routineCtx.routine;
  const subTasks=routine.tasks[taskIndex].subTasks
  return (
    <div className='bg-secondary p-2 w-full m-1'>
      <Title className="text-primary text-center">List Of SubTasks</Title>
        <ul className='text-primary'>
        {subTasks.map(
          (subTask,index)=><li key={index}><ListItem data={subTask}/></li>
        )}
      </ul>
      
    </div>
  )
}

export default ListOfSubTasks
