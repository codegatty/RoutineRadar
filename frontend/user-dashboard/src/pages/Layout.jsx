import Header from "../components/Header"
import SideBar from "../components/SideBar";
import NavBar from  '../components/NavBar'
import Main from "../components/Main";
import { useState } from "react";

function Layout() {
  const [sidebarToggle,setSidebarToggle] =useState(true);
  return (
    <div className="w-screen h-screen bg-primary flex flex-col">
      <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>

      <hr className="h-px mt-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex lg:flow-col flex-col sm:flex-row h-full">
      <div className=" flex-2">
        <SideBar sidebarToggle={sidebarToggle}/>
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
