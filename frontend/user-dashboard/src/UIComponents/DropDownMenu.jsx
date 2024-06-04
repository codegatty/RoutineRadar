import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {Link} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { RiRoadMapLine } from "react-icons/ri";
function DropDownMenu({user}) {
    const menuItemClasses="px-3 py-1 text-sm font-semibold"
  return (
    <Menu >
    <MenuButton className="flex justify-center items-center ">
      <img src={`http://localhost:5002/profile/${user?.profilePic}`} alt="no image found"  className='rounded-full border border-1 border-white w-9 h-9 object-cover'/>
    </MenuButton>
    <MenuItems anchor="bottom" className="bg-secondary text-primary text-sm py-2 m-1 rounded-md w-32">
      
      <MenuItem className={menuItemClasses}>
        <Link className="block data-[focus]:bg-primary " to="/profile">
          <div className='flex flex-row justify-center items-center gap-2'>
          <CgProfile className='flex-2'/><span className='flex-1'>Profile</span>
          </div>
         
        </Link>
      </MenuItem>


      <MenuItem className={menuItemClasses}>
        <Link className="block data-[focus]:bg-primary " to="/routine">
          <div className='flex flex-row justify-center items-center gap-2'>
          <CgProfile className='flex-2'/><span className='flex-1'>Edit Routine</span>
          </div>
         
        </Link>
      </MenuItem>

      <MenuItem className={menuItemClasses}>
        <Link className="block data-[focus]:bg-primary " to="/roadmap">
          <div className='flex flex-row justify-center items-center gap-2'>
          <RiRoadMapLine className='flex-2'/><span className='flex-1'>RoadMaps</span>
          </div>
         
        </Link>
      </MenuItem>

      <MenuItem className={menuItemClasses}>
      <Link to="/challenge" className="block data-[focus]:bg-primary ">
      <div className='flex flex-row justify-center items-center gap-2'>
          <CiSettings className='flex-2'/><span className='flex-1'>Challenges</span>
          </div>
      </Link>
      </MenuItem>

      <MenuItem className={menuItemClasses}>
      <Link to="/" className="block data-[focus]:bg-primary ">
      <div className='flex flex-row justify-center items-center gap-2'>
          <CiSettings className='flex-2'/><span className='flex-1'>Settings</span>
          </div>
      </Link>
      </MenuItem>

      <MenuItem className={menuItemClasses}>
      <button className='block data-[focus]:bg-primary w-full ' >
        
      <div className='flex flex-row justify-start items-center '>
          <IoIosLogOut className='flex-1 text-red-500 '/><span className='flex-1 text-red-500' >Logout</span>
          </div>
        
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
  )
}

export default DropDownMenu
