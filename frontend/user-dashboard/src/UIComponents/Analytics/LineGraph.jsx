import { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales } from 'chart.js'
import { RoutineContext } from '../../context/RoutineProvider'
import {AnalyticsContext} from '../../context/AnalyticsContext'

//import { setWeekData, getWeekData } from '../../localStorage/weekDataMangament'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
function LineGraph({data,totalNoOfTasks}) {
  const graphPrimaryColor="#2f405c"
  const routineCtx = useContext(RoutineContext)
  const analyticsCtx=useContext(AnalyticsContext)
  const maxTasks = routineCtx.routine?.tasks?.length
  const [UnCompletedData, setUnCompletedData] = useState([0,0,0,0,0,0,0])

  useEffect(()=>{
    const temp=analyticsCtx.analytics.weeklyTaskData
    const totalTasks=routineCtx.routine.tasks.length
    setUnCompletedData(temp.map((ele)=>{return totalTasks-ele}))
  },[routineCtx.updateTaskIsCompleted])

  let lineChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: analyticsCtx.analytics.weeklyTaskData,
        borderColor: '#0ea5e9'
      },
      {
        label: 'UnCompleted Tasks',
        data: UnCompletedData,
        borderColor: '#07567a'
      }
    ]
  }
  //? its a nice blue color -(you can try it) rgb(75, 192, 192)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: graphPrimaryColor // Legend label color
        },
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Tasks: Completed vs Uncompleted (Week)',
        color:graphPrimaryColor
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: graphPrimaryColor,
        },
        min: 0,
        max: maxTasks,
        grid: {
          borderColor: graphPrimaryColor, // X-axis border color
          color: graphPrimaryColor, // X-axis grid line color
        }
      },
      x:{
        ticks:{
          color: graphPrimaryColor
        },
        grid:{
          borderColor: graphPrimaryColor, // X-axis border color
          color: graphPrimaryColor, // X-axis grid line color
        }
      }
    }

  }
  return (
    <div>
      <Line data={lineChartData} options={options} />
    </div>
  )
}

export default LineGraph
