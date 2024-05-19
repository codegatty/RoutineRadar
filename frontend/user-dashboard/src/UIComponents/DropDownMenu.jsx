import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {Link} from 'react-router-dom'


function DropDownMenu({user}) {
    
  return (
    <Menu>
    <MenuButton className="flex justify-center items-center">
      <img src={`http://localhost:5002/profile/${user?.profilePic}`} alt="no image found" height={30} width={30} className='rounded'/>
    </MenuButton>
    <MenuItems anchor="bottom" className="bg-secondary text-primary text-sm p-2 m-1 rounded-sm">
      <MenuItem>
        <Link className="block data-[focus]:bg-blue-100 " to="/profile">
          Profile
        </Link>
      </MenuItem>
      <MenuItem>
        <a className="block data-[focus]:bg-blue-100" href="/support">
          Support
        </a>
      </MenuItem>
      <MenuItem>
      <button className='className="block data-[focus]:bg-blue-100' >Logout</button>
      </MenuItem>
    </MenuItems>
  </Menu>
  )
}

export default DropDownMenu
