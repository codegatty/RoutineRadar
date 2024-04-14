import {Bar} from 'react-chartjs-2'

//required things for line graph
//import {Chart,CategoryScale,LinearScale,LineElement,PointElement,Title,Tooltip,Legend} from 'chart.js'

import {Chart,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js'

Chart.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)

function BarGraph({barData}) {
  console.log(barData)
  const barChartData={
    labels:["Sunday","Monday","Tuesday","Wednesday","Friday","Saturday"],
    datasets:[
        {
            label:"No of challenge/day/week",
            data:barData,
            backgroundColor:["rgba(26, 32, 44, 0.8)"],
            borderColor:["rgba(0,0,255,0.2)"],
            borderWidth:1
        }
    ]
};
    const option={}
  return (
    <div>
      <Bar data={barChartData} options={option}/>
    </div>
  )
}

export default BarGraph