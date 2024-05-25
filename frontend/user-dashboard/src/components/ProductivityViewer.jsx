import classNames from "classnames"
import {getScoreData} from '../localStorage/weekScoreMangament'
import { useContext, useEffect, useState } from "react"
import { RoutineContext } from "../context/RoutineProvider"
import { baseScore } from "../constants/baseTaskScore"

function ProductivityViewer() {
    const routineCtx=useContext(RoutineContext);
    const maxScoreOfWeek=(routineCtx?.routine?.tasks.length*baseScore)*7
    const [productivity,setProductivity]=useState(0)
    useEffect(()=>{
        let currentScore=getScoreData();
        //?set the productivity in percentage
        setProductivity((currentScore/maxScoreOfWeek)*100)
    },[routineCtx.routine])
  return (
    <div >
      
        <div className={classNames("bg-app-blue p-3 rounded-lg flex-1 m-5 flex justify-center items-center gap-2 animate-bounce ")}>
            <span className=' flex-1 font-thin text-sm text-white'>Productivity of the week</span> <span className='flex-2 text-blue-700 font-bold'>{productivity.toFixed(2)}%</span>
          </div>
    </div>
  )
}

export default ProductivityViewer
