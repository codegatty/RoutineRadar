import React from 'react'

import {Outlet,Link} from 'react-router-dom'

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


function Dashboard() {
  
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
