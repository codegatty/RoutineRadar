
import {useContext} from 'react'
import { RoutineContext } from '../context/RoutineProvider'
function ListOfTasks({onSelect}) {
  function onSelectHandler(index){
    onSelect(index) 
  }
  const routineCtx=useContext(RoutineContext);
  const routine=routineCtx.routine.tasks;
  return (
    <div className='border border-1 text-red-500'>
      <ul>
        {routine.map((task,index)=>{
          return <li key={index} onClick={onSelectHandler.bind(this,index)}>{task.title}</li>
        })}
      </ul>
    </div>
  )
}

export default ListOfTasks
