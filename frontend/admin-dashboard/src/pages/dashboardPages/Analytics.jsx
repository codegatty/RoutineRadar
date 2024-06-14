import  { useEffect,useState } from 'react'
import AnalyticsGrid from '../../UIComponents/AnalyticsGrid'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import BarGraph from '../../components/BarGraph';
import PieGraph from '../../components/PieGraph';

function Analytics() {
  const {token}=useAuth();
const axiosPrivate=useAxiosPrivate();

const [countData,setCountData]=useState({
  "adminCount": "---",
  "challengeCount":"---" ,
  "userCount":"---"
})

  useEffect(()=>{
    async function getCounts(){

      try{
        const tokenId=token();
      const response=await axiosPrivate.get("/counts",{withCredentials:true,
    headers: {
      'Authorization': `Bearer ${tokenId}`
    }});
    console.log(response.data)
    setCountData(response.data);
      }catch(e){
        console.log(e);
      }
      
    }
    getCounts();
  },[])
console.log(countData.noRoutineEnabledUsers)
  return (
    <div className='mt-5  h-full overflow-y-scroll'>
      <AnalyticsGrid data={countData}/>
      <div class="grid grid-cols-2 gap-4 ">
  <div>
    <BarGraph barData={countData.challengeBarData} label="No of challenge/day/week"/>
  </div>
  <div>
  <BarGraph barData={countData.UserBarData} label="No of users registered/day/week"/>
  </div>
  <div>
    <PieGraph routineEnabledUser={countData.noRoutineEnabledUsers} totalUser={countData.userCount}/>
  </div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
  <div>07</div>
  <div>08</div>
  <div>09</div>
</div>
    </div>
  )
}

export default Analytics
