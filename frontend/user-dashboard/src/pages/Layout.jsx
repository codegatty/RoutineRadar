import { useState,useEffect,useContext} from "react";
import {useNavigate} from 'react-router-dom'


import { RoutineContext } from "../context/RoutineProvider";
import { axios_public } from "../axios_config/axiosConfig";
import { axios_user } from "../axios_config/axiosConfig";
import {UserContext} from '../context/userContext';
 
import Header from "../components/Header"
import SideBar from "../components/SideBar";
import NavBar from  '../components/NavBar'
import Main from "../components/Main";


function Layout() {
  const [sidebarToggle,setSidebarToggle] =useState(true);
  const [taskId,setTaskId]=useState(null);
  const navigate=useNavigate();

  const routineCtx=useContext(RoutineContext);
  const userCtx=useContext(UserContext)



  useEffect(()=>{
    async function fetchRoutine(){
      try{

        //?obtaining routine from backend
        const response2=await axios_user.get(`routine/${userCtx.userId}`)
         routineCtx.storeRoutine(response2.data[0])
       
      }catch(error){
        console.log(error);
      }
      
    }
    fetchRoutine();
  },[])

  function createHandler(){
    navigate("/routine")
  }

  function taskIdHandler(taskId){
    setTaskId(taskId)
  }
  return (
    <div className="w-screen h-screen bg-primary flex flex-col overflow-hidden">
      <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>

      <hr className="h-px mt-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex lg:flow-col flex-col sm:flex-row h-full">
      <div className=" flex-2 h-full ">
        {/* //!Commented for testing purpose */}
        
        <SideBar sidebarToggle={sidebarToggle} routine={routineCtx.routine} selectedTaskId={taskIdHandler} />
        
      </div>
      <div className="flex-1">
      {/* //!Commented for testing purpose */}
      <Main taskId={taskId}/>
      </div>
      <div className=" flex-2">
      <NavBar/>
      </div>
      
      </div>
    
    </div>
  )
}

export default Layout
