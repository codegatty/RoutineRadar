import { useContext, useEffect, useState } from "react"
import { RoutineContext } from "../context/RoutineProvider"
import {createDateFromString} from '../utility/createDateFromString'
import { getRemainingMin } from "../utility/getRemainingMin"
import MyTimer from '../components/MyTimer'

function Main({taskId}) {
  const routineCtx=useContext(RoutineContext);
  const [enableTimer,setEnableTimer]=useState(false)
  const selectedTask=routineCtx.routine?.tasks?.find((task)=>task._id===taskId)
  
  useEffect(()=>{
    if(selectedTask){
    const startTime=createDateFromString(selectedTask.startsAt)
    const endTime=createDateFromString(selectedTask.endsAt)
    if(startTime.getTime()<=new Date().getTime() && endTime.getTime()>=new Date().getTime()){
      setEnableTimer(true)
    }else{
      setEnableTimer(false)
    }
    
    }
    

  },[taskId])

  return (
    <div className="text-white flex flex-col justify-around">
        <div className="flex-1">
          {
            
            enableTimer?
            <MyTimer expiryTimestamp={createDateFromString(selectedTask.endsAt)}/>
            :
            <div className=" text-center text-lg p-1">Task Time Expired</div>
          }
        </div>
        <div className="flex-1 flex flex-row justify-around">
          <div>
            noSubtask
          </div>
          <div>
            completdSubTask
          </div>
          <div>
            non compleed subTask
          </div>
          <div>
            score accured
          </div>
        </div>
        <div className="flex-1">{taskId}</div>
    </div>
  )
}

export default Main
