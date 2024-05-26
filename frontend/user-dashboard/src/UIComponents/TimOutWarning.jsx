
import { LuTimerOff } from "react-icons/lu";
function TimOutWarning() {
  return (
    <div className=" text-center  p-1 text-red-500 text-sm flex justify-center items-center">
    <span className=" border border-1 border-red-500 p-1 flex flex-col justify-center items-center"><LuTimerOff />Task Time Expired</span>
  </div>
  )
}

export default TimOutWarning
