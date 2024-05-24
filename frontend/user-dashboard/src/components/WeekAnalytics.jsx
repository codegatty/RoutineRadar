import LineGraph from "../UIComponents/Analytics/LineGraph"
function WeekAnalytics() {
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-1">

        <div className="">
          <LineGraph/>
        </div>

        <div className="bg-blue-500">
          02
        </div>

      </div>
    </div>
  )
}

export default WeekAnalytics
