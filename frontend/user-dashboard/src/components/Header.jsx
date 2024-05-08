
import { TfiAlignLeft } from "react-icons/tfi";

function Header({sidebarToggle,setSidebarToggle}) {
  function sidebarToggleHandler(){
    setSidebarToggle(!sidebarToggle)
  }
  return (
    <div className="bg-primary h-10 flex flex-row justify-between items-center px-5 ">
      
      <div className='flex flex-row '>
        <button className="mr-2" onClick={sidebarToggleHandler}><TfiAlignLeft color="white" size={25} /></button>
        <h1 className='text-center text-1xl text -white'>Routine Radar</h1>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Header
