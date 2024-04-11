import { useState } from 'react';

import {Outlet,Link} from 'react-router-dom'

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate'


function Dashboard() {

  const axiosPrivate=useAxiosPrivate();
  const {setCurrentAdmin,token}=useAuth()

  useState(()=>{
      async function fetchCurrentAdmin(){
        try{
          const tokenId=token();
          const response=await axiosPrivate.get("http://localhost:5000/admin/auth/current",{
            withCredentials:true,
            headers:{
              Authorization:"Bearer "+tokenId
            }
          });
          
          setCurrentAdmin(response.data);
        }catch(er){
          console.log(er)
        }
      }
      fetchCurrentAdmin();
  },[])

  
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      <Sidebar/>
      <div className='flex-1'>
      <Header/>
      <Outlet/>
      </div>
     
    </div>
  )
}

export default Dashboard
