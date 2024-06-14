import {Pie} from 'react-chartjs-2'


import {Chart,Tooltip,Legend,ArcElement} from 'chart.js'


Chart.register(Tooltip,Legend,ArcElement)

function PieGraph({totalUser,routineEnabledUser}) {

  let pieChartData={
    labels: ["User Without Routine", "User With Routine"], 
    datasets:[
        {
            label:"no of users",
            data:[totalUser-routineEnabledUser,routineEnabledUser],
            backgroundColor:[
                "rgba(26, 32, 44, 0.5)",
                "rgba(26, 32, 44, 0.8)",
            ],
            hoverOffset:4
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
    text: 'user without routine vs user with routine',
    
  }
}
}
  return (
    <div>
      <Pie data={pieChartData} options={option}/>
    </div>
  )
}

export default PieGraph