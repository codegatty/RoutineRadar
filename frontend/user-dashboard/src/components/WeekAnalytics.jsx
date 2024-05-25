import LineGraph from "../UIComponents/Analytics/LineGraph"
import PieGraph from "../UIComponents/Analytics/PieGraph"
import ProductivityViewer from "./ProductivityViewer"
import classNames from "classnames"
function WeekAnalytics({className}) {
  
  return (
    <div className={classNames("h-full overflow-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary mb-5",className)}>
      <div className="grid grid-cols-2 gap-1">

        <div className="">
          <LineGraph/>
        </div>
        <div className="">
          <PieGraph/>
        </div>
        <div>
          <ProductivityViewer/>
        </div>
      </div>
    </div>
  )
}

export default WeekAnalytics