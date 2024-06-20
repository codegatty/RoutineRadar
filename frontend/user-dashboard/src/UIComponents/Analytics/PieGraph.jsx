
import { useEffect,useState,useContext } from 'react'
import {Pie} from 'react-chartjs-2'

//required things for line graph
//import {Chart,CategoryScale,LinearScale,LineElement,PointElement,Title,Tooltip,Legend} from 'chart.js'

import {Chart,Tooltip,Legend,ArcElement, plugins} from 'chart.js'
import { RoutineContext } from '../../context/RoutineProvider'
import {baseScore} from '../../constants/baseTaskScore'
import { AnalyticsContext } from '../../context/AnalyticsContext'

Chart.register(Tooltip,Legend,ArcElement)

function PieGraph() {
  const graphPrimaryColor="#2f405c"
    const [weekScore,setWeekScore]=useState(0)
    const routineCtx=useContext(RoutineContext)
    const analyticsCtx=useContext(AnalyticsContext)
    const totalScore=((routineCtx.routine?.tasks?.length)*baseScore)*7;

    useEffect(()=>{
      setWeekScore(analyticsCtx.analytics.weeklyScoreData)
    },[routineCtx.updateTaskIsCompleted])
    
    let pieChartData={
        labels: ["Total score of the week","Achieved score of the week"], 
        datasets:[
            {
                label:"Score",
                data:[totalScore,weekScore],
                backgroundColor:[
                    "#0ea5e9",
                    "#07567a",
                ],
                borderColor: [graphPrimaryColor, graphPrimaryColor],
                hoverOffset:30, 
            },
        ]
    }

    
    const option={  
      radius:"100%",
      maintainAspectRatio: false,
      plugins:{
      legend:{
        position:"left"
      },
      title: {
        display: true,
        text: 'Tasks: Completed vs Uncompleted (Week)',
        color:graphPrimaryColor
      }
    }
    }
  return (
    <div>
      <Pie data={pieChartData} options={option}  />
    </div>
  )
}

export default PieGraph