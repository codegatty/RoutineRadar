import React from 'react'
import { useContext } from 'react'
import { RoutineContext } from '../context/RoutineProvider'
import Title from '../UIComponents/Title';
import ListItemSubTask from '../UIComponents/ListItemSubTask';

function ListOfSubTasks({taskIndex,onSelect}) {
  const routineCtx=useContext(RoutineContext);
  const routine=routineCtx.routine;
 
  const subTasks=routine.tasks[taskIndex]?.subTasks?routine.tasks[taskIndex].subTasks:[]

  function onSelectHandler(index){
    onSelect(index);
  }
  
  return (
    <div className='bg-secondary p-2 w-full m-1 h-full'>
      <Title className="text-primary text-center">List Of SubTasks</Title>
        <ul className='text-primary h-48 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary'>
         {subTasks && subTasks.map(
          (subTask,index)=><li key={index} onClick={onSelectHandler.bind(this,index)}><ListItemSubTask data={subTask}/></li>
        )}
      </ul>
      
    </div>
  )
}

export default ListOfSubTasks
