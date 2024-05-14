import { useState,useEffect,useContext} from "react";
import {useNavigate} from 'react-router-dom'

import { RoutineContext } from "../context/RoutineProvider";
import { axios_public } from "../axios_config/axiosConfig";

import Header from "../components/Header"
import SideBar from "../components/SideBar";
import NavBar from  '../components/NavBar'
import Main from "../components/Main";


function Layout() {
  const [sidebarToggle,setSidebarToggle] =useState(true);
  const navigate=useNavigate();
  const routineCtx=useContext(RoutineContext);

  useEffect(()=>{
    async function fetchRoutine(){
      try{
        const response=await axios_public.get("/6623842ca349171323f3c4f9")
         routineCtx.storeRoutine(response.data[0])
       
      }catch(error){
        console.log(error);
      }
      
    }
    fetchRoutine();
  },[])

  function createHandler(){
    navigate("/routine")
  }
  return (
    <div className="w-screen h-screen bg-primary flex flex-col">
      <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>

      <hr className="h-px mt-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex lg:flow-col flex-col sm:flex-row h-full">
      <div className=" flex-2">
        <SideBar sidebarToggle={sidebarToggle} routine={routineCtx.routine}/>
        <button className="btn bg-red-300" onClick={createHandler}>add new routine</button>
      </div>
      <div className="bg-blue-500 flex-1">
      <Main />
      </div>
      <div className="bg-green-500 flex-2">
      <NavBar/>
      </div>
      
      </div>
    
    </div>
  )
}

export default Layout
