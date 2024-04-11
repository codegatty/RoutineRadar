import React, { useEffect } from 'react'
import AnalyticsGrid from '../../UIComponents/AnalyticsGrid'
import useAuth from '../../hooks/useAuth'
import useRefresh from '../../hooks/useRefresh';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



function Analytics() {
  const {authState,token}=useAuth();
  const tokenRefresher=useRefresh(); 

const axiosPrivate=useAxiosPrivate();

  useEffect(()=>{
    async function getProfile(){

      try{
        const tokenId=token();
      const response=await axiosPrivate.get("http://localhost:5000/admin/auth/current",{withCredentials:true,
    headers: {
      'Authorization': `Bearer ${tokenId}`
    }});

    console.log(response.data);
      }catch(e){
        console.log(e);
      }
      
    }
    getProfile();
  },[])

  return (
    <div className='mt-5'>
      <AnalyticsGrid />
      authantication state:{authState().toString()}
      <button onClick={async ()=>{
        tokenRefresher();
        
      }}>refresh</button>
    </div>
  )
}

export default Analytics
