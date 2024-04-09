import React from 'react'
import AnalyticsGrid from '../../UIComponents/AnalyticsGrid'
import useAuth from '../../hooks/useAuth'
import useRefresh from '../../hooks/useRefresh';
import axios from "axios";

function Analytics() {
  const {authState}=useAuth();
  const tokenRefresher=useRefresh(); 

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
