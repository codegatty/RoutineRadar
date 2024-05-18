
import { TfiAlignLeft } from "react-icons/tfi";
import { useContext } from "react";
import {RoutineContext} from '../context/RoutineProvider'
import { UserContext } from "../context/userContext";
import {useAuth0} from '@auth0/auth0-react'

import DropDownMenu from "../UIComponents/DropDownMenu";

function Header({sidebarToggle,setSidebarToggle}) {

  const routineCtx=useContext(RoutineContext)
  const userCtx=useContext(UserContext)
  const {logout} =useAuth0()

  function sidebarToggleHandler(){
    setSidebarToggle(!sidebarToggle)
  }
  return (
    <div className="bg-primary h-10 flex flex-row justify-around items-center px-5 ">
      
      <div className='flex flex-row  flex-1'>
        <button className="mr-2" onClick={sidebarToggleHandler}><TfiAlignLeft color="white" size={25} /></button>
        <h1 className='text-center text-1xl text-white font-semibold'>Routine Radar</h1>
      </div>

      <div className="flex-1 flex">
      <div className="bg-yellow-900 p-1 rounded-lg flex flex-row justify-center items-center text-white font-bold ">
          <span className="flex-1 text-sm">Score:  </span><span className="flex-1">{routineCtx?.routine?.score}</span>
        </div>        
      </div>
      <div className="flex-1">
        <DropDownMenu user={userCtx.userData}/>
        </div>
        <div className="flex-1 flex">
        <button  onClick={logout} className="  bg-red-500 p-1 text-sm font-semibold rounded-lg ">Logout</button>
        </div>
      
    </div>
  )
}

export default Header
