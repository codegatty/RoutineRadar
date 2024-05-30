import { useState, useEffect, useContext,useCallback } from 'react'

import { RoutineContext } from '../context/RoutineProvider'
import { RoadmapContext } from '../context/RoadmapProvider'
import { axios_user } from '../axios_config/axiosConfig'
import { UserContext } from '../context/userContext'
import {taskNotifier} from '../utility/taskNotifier'

import Header from '../components/Header'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import Main from '../components/Main'
import WeekAnalytics from '../components/WeekAnalytics'

function Layout() {
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const [taskId, setTaskId] = useState(null)
  
  const routineCtx = useContext(RoutineContext)
  const userCtx = useContext(UserContext)
  const roadmapCtx = useContext(RoadmapContext)
  

  useEffect(() => {
    async function fetchRoutine() {
      
      try {
        //?obtaining routine from backend
        const response2 = await axios_user.get(`routine/${userCtx.userId}`)
        const response3=await axios_user.get(`roadmap/${userCtx.userId}`)
        routineCtx.storeRoutine(response2.data[0])
        roadmapCtx.storeRoadMaps(response3.data)
        //?this will create multiple timeout callback to trigger notification in future
        taskNotifier(response2.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchRoutine()
   
  }, [])

 

  function taskIdHandler(taskId) {
    setTaskId(taskId)
  }
  return (
    <div className="w-screen h-screen bg-primary flex flex-col overflow-hidden">
      <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

      <hr className="h-px mt-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex lg:flow-col flex-col sm:flex-row h-full">
        <div className=" flex-2 h-full ">
          <SideBar sidebarToggle={sidebarToggle} routine={routineCtx.routine} selectedTaskId={taskIdHandler} />
        </div>
        <div className="flex-1 flex flex-col">
          
          <div className="flex-1">
          {taskId ? (
            <Main taskId={taskId}  />
          ) : (
            <div className=" flex-1 h-full flex justify-center items-center">
              <h1 className=" flex-1 font-bold text-secondary text-xl text-center">Select a Task</h1>
            </div>
          )}
          </div>
          
          <WeekAnalytics className="flex-1" />
        </div>
        <div className=" flex-2">
          <NavBar />
        </div>
      </div>
    </div>
  )
}

export default Layout
