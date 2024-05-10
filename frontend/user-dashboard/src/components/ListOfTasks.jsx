
import {useContext} from 'react'
import { RoutineContext } from '../context/RoutineProvider'
import ListItem from '../UIComponents/ListItem';
import Title from '../UIComponents/Title';
function ListOfTasks({onSelect}) {
  function onSelectHandler(index){
    onSelect(index) 
  }
  const routineCtx=useContext(RoutineContext);
  const tasks=routineCtx.routine.tasks;
  return (
    <div className='bg-secondary p-2 w-full m-1'>
      <Title className="text-primary text-center">List Of Tasks</Title>
      <ul className='text-primary '>
        {tasks.map((task,index)=>{
          return <li key={index} onClick={onSelectHandler.bind(this,index)}><ListItem data={task}/></li>
        })}
      </ul>
    </div>
  )
}

export default ListOfTasks
