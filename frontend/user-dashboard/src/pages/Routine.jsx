import {useContext,useState} from 'react'
import TaskForm from "../components/TaskForm";
import SubTaskForm from "../components/SubTaskForm";
import RoutineForm from "../components/RoutineForm";

import {RoutineContext} from "../context/RoutineProvider"
;

function Routine() {
  const [selectedTaskIndex,setSelectedTaskIndex]=useState(-1);
  function onSelectTaskIndex(index){
    setSelectedTaskIndex(index)
  }
const routineCtx=useContext(RoutineContext)

  return (
    <div className="w-full h-screen  bg-primary flex flex-row">
      <div className='flex-2  justify-center items-center '>
        {
          routineCtx.routine===null?<RoutineForm />:<TaskForm defaultValue={routineCtx.routine.tasks[selectedTaskIndex]} selectedIndex={selectedTaskIndex}/>
        }
      </div>

      <div className="flex-1">
        {routineCtx.routine===null?"":<SubTaskForm onSelectIndex={onSelectTaskIndex}/>}
      
      </div>
    </div>
  );
}

export default Routine;
