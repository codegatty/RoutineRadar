import { useContext, useEffect, useState } from "react"
import { RoutineContext } from "../context/RoutineProvider"
import {createDateFromString} from '../utility/createDateFromString'
import MyTimer from '../components/MyTimer'
import CountCard from "../UIComponents/CountCard"
import { LuTimerOff } from "react-icons/lu";

function Main({taskId}) {
  const routineCtx=useContext(RoutineContext);
  const [enableTimer,setEnableTimer]=useState(false)
  const selectedTask=routineCtx.routine?.tasks?.find((task)=>task._id===taskId)
  const   [counts,setCounts]=useState({
    noOfSubtasks:0,
    completedSubtasks:0,
    nonCompletedSubtasks:0,
  })
  
  useEffect(()=>{
    if(selectedTask){
    const startTime=createDateFromString(selectedTask.startsAt)
    const endTime=createDateFromString(selectedTask.endsAt)

    console.log(selectedTask.subTasks.length)

    setCounts(()=>{
      return {
        noOfSubtasks:selectedTask.subTasks.length,
        completedSubtasks:selectedTask.subTasks.filter((subTask)=>subTask.isCompleted).length,
        nonCompletedSubtasks:selectedTask.subTasks.filter((subTask)=>!subTask.isCompleted).length,
      }
    })


    if(startTime.getTime()<=new Date().getTime() && endTime.getTime()>=new Date().getTime()){
      setEnableTimer(true)
    }else{
      setEnableTimer(false)
    }
    }


    
    

  },[taskId,routineCtx.routine])

  return (
    <div className="text-white flex flex-col justify-around">
      <div>
        <h1 className="text-center text-2xl capitalize underline m-2">{selectedTask?.title}</h1>
      </div>
      {
        selectedTask?.isCompleted &&<div className="flex-1 flex item-center justify-center my-1">
        <span className="bg-secondary text-primary p-2  rounded-md capitalize">task has been completed</span>
      </div>
      }

        <div className="flex-1 ">
          {
            
            enableTimer?
            <MyTimer expiryTimestamp={createDateFromString(selectedTask.endsAt)}/>
            :
            <div className=" text-center  p-1 text-red-500 text-sm flex justify-center items-center">
              <span className=" border border-1 border-red-500 p-1 flex flex-col justify-center items-center"><LuTimerOff />Task Time Expired</span>
            </div>
          }
        </div>
        <div className="flex-1 flex flex-row justify-around">
          <CountCard label="No. of SubTasks: " count={counts.noOfSubtasks}/>
          <CountCard label="Completed SubTask: " count={counts.completedSubtasks}/>
          <CountCard label="Non Completed SubTask: " count={counts.nonCompletedSubtasks}/>
          <CountCard label="Score Attained: " count={0}/>
        </div>
        <div className="flex-1">{taskId}</div>
        <div className="flex">

        </div>
    </div>
  )
}

export default Main
