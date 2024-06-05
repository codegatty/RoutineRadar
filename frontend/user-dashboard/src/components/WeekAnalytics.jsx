import LineGraph from "../UIComponents/Analytics/LineGraph"
import PieGraph from "../UIComponents/Analytics/PieGraph"
import ProductivityViewer from "./ProductivityViewer"
import classNames from "classnames"
function WeekAnalytics({className,isRoutineExist}) {
  
  return (
    <div className={classNames("h-full overflow-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary mb-5",className)}>
      <div className="grid grid-cols-2 gap-1">

        <div className="">
          {isRoutineExist && <LineGraph/>}
        </div>
        <div className="">
          {isRoutineExist && <PieGraph/>}
        </div>
        <div>
          {isRoutineExist && <ProductivityViewer/>}
        </div>
      </div>
    </div>
  )
}

export default WeekAnalytics
