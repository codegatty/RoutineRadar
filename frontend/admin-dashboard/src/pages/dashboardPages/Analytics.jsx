import  { useEffect,useState } from 'react'
import AnalyticsGrid from '../../UIComponents/AnalyticsGrid'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



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
      const response=await axiosPrivate.get("http://localhost:5000/admin/counts",{withCredentials:true,
    headers: {
      'Authorization': `Bearer ${tokenId}`
    }});
    setCountData(response.data);
      }catch(e){
        console.log(e);
      }
      
    }
    getCounts();
  },[])

  return (
    <div className='mt-5'>
      <AnalyticsGrid data={countData}/>
    </div>
  )
}

export default Analytics
