import {useContext} from 'react'
import TaskForm from "../components/TaskForm";
import SubTaskForm from "../components/SubTaskForm";
import RoutineForm from "../components/RoutineForm";

import {RoutineContext} from "../context/RoutineProvider"

import List from '../UIComponents/List';

function Routine() {
const routineCtx=useContext(RoutineContext)

  return (
    <div className="w-screen h-screen bg-primary flex flex-row">
      <div className='flex-1 flex justify-center items-center'>
        {
          routineCtx.routine===null?<RoutineForm/>:<TaskForm/>
        }
      </div>

      <div className="flex-1">
        {routineCtx.routine===null?"":<SubTaskForm/>}
      
      </div>
    </div>
  );
}

export default Routine;
