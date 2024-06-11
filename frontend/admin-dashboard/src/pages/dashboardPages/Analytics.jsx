import  { useEffect,useState } from 'react'
import AnalyticsGrid from '../../UIComponents/AnalyticsGrid'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import BarGraph from '../../components/BarGraph';



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
    setCountData(response.data);
    console.log(response.data);
      }catch(e){
        console.log(e);
      }
      
    }
    getCounts();
  },[])

  return (
    <div className='mt-5'>
      <AnalyticsGrid data={countData}/>
      <div class="grid grid-cols-2 gap-4">
  <div>
    <BarGraph barData={countData.barDataSet}/>
  </div>
  <div>02</div>
  <div>03</div>
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
