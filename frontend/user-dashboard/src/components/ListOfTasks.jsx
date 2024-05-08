
import {useContext} from 'react'
import { RoutineContext } from '../context/RoutineProvider'
function ListOfTasks() {

  const routineCtx=useContext(RoutineContext);
  const routine=routineCtx.routine;
  console.log(routine)
  return (
    <div className='border border-1'>
      <ul>
        <li>{routine.title}</li>
        <li>title start_time end_time</li>
      </ul>
    </div>
  )
}

export default ListOfTasks
