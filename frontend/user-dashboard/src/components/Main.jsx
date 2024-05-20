import { useContext, useState,useLayoutEffect } from "react"
import { RoutineContext } from "../context/RoutineProvider"
import {createDateFromString} from '../utility/createDateFromString'
import MyTimer from '../components/MyTimer'
import CountCard from "../UIComponents/CountCard"
import { LuTimerOff } from "react-icons/lu";
import {scoreCalculatorFromTasks} from '../utility/scoreCalculator'
import {useNavigate} from 'react-router-dom'

function Main({taskId}) {
  const navigate=useNavigate()
  const routineCtx=useContext(RoutineContext);
  const [enableTimer,setEnableTimer]=useState(false)
  const selectedTask=routineCtx.routine?.tasks?.find((task)=>task._id===taskId)
  const   [counts,setCounts]=useState({
    noOfSubtasks:0,
    completedSubtasks:0,
    nonCompletedSubtasks:0,
    scoreAttained:0
  })


  
  useLayoutEffect(()=>{
    if(selectedTask){
    const startTime=createDateFromString(selectedTask.startsAt)
    const endTime=createDateFromString(selectedTask.endsAt)

    setCounts(()=>{
      return {
        noOfSubtasks:selectedTask.subTasks.length,
        completedSubtasks:selectedTask.subTasks.filter((subTask)=>subTask.isCompleted).length,
        nonCompletedSubtasks:selectedTask.subTasks.filter((subTask)=>!subTask.isCompleted).length,
        scoreAttained:scoreCalculatorFromTasks(selectedTask)
      }
    })

    if(startTime.getTime()<=new Date().getTime() && endTime.getTime()>=new Date().getTime()){
      setEnableTimer(true)
    }else{
      setEnableTimer(false)
    }
    }

  },[taskId,routineCtx.routine])

  function createRoutineHandler(){
    navigate("/routine")
  }

  return (
    <>{
    routineCtx.routine?
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
        {selectedTask?.subTasks.length > 0?
        <div className="flex-1 flex flex-row justify-around">
          <CountCard label="No. of SubTasks: " count={counts.noOfSubtasks}/>
          <CountCard label="Completed SubTask: " count={counts.completedSubtasks}/>
          <CountCard label="Non Completed SubTask: " count={counts.nonCompletedSubtasks}/>
          <CountCard label="Score Attained: " count={counts.scoreAttained}/>
        </div>:<div className="flex-1 flex flex-row justify-around">
        <CountCard label="No. of SubTasks: " count={counts.noOfSubtasks} disabled={true}/>
          <CountCard label="Completed SubTask: " count={counts.completedSubtasks} disabled={true}/>
          <CountCard label="Non Completed SubTask: " count={counts.nonCompletedSubtasks} disabled={true}/>
          <CountCard label="Score Attained: " count={counts.scoreAttained}/></div>}
        <div className="flex">

        </div>
    </div>
    :<div className=' h-full flex justify-center items-center'>
      <div className="flex flex-col items-center ">
    <h1 className=' flex-1 font-bold text-secondary text-xl text-center'>No Routine Found</h1>
    <button className="mt-1 p-1 bg-app-blue rounded-lg text-secondary font-semibold text-sm" onClick={createRoutineHandler}>Create Routine</button>
    </div>
  </div>
}
    </>
  )
}

export default Main
