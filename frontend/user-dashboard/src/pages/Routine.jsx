import { useContext, useState } from 'react'
import TaskForm from '../components/TaskForm'
import SubTaskForm from '../components/SubTaskForm'
import RoutineForm from '../components/RoutineForm'
import { RoutineContext } from '../context/RoutineProvider'
import { axios_user } from '../axios_config/axiosConfig'
import { UserContext } from '../context/userContext'
import {useNavigate} from 'react-router-dom'

function Routine() {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1)
  const routineCtx = useContext(RoutineContext)
  const userCtx=useContext(UserContext)
  const navigate=useNavigate()

  function onSelectTaskIndex(index) {
    setSelectedTaskIndex(index)
  }

  async function routineDeleteHandler(){
    try{    
    await axios_user.delete(`/routine/${userCtx.userId}`);
    userCtx.deleteRoutine();
    routineCtx.deleteRoutine();
    navigate("/")
  }catch(e){
    console.log(e)
  }
  }

  return (
    <div className="w-full h-screen  bg-primary flex flex-row overflow-hidden ">
      <div className="flex-2  justify-center items-center   ">
        {routineCtx?.routine === null ? (
          <RoutineForm />
        ) : (
          <div className='flex flex-col h-full flex-1'>
          <TaskForm defaultValue={routineCtx?.routine?.tasks[selectedTaskIndex]} selectedIndex={selectedTaskIndex} />
          <div className='flex-2 '>
          <button className='w-full py-2 text-sm font-semibold bg-red-400 hover:bg-red-500 ' onClick={routineDeleteHandler}>Delete Routine</button>
          </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        {routineCtx?.routine === null ? '' : <SubTaskForm onSelectIndex={onSelectTaskIndex} />}
      </div>
    </div>
  )
}

export default Routine
