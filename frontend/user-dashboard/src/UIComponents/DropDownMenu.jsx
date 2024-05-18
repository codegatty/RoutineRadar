import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {Link} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'

function DropDownMenu({user}) {
    const {logout}=useAuth0()
  return (
    <Menu>
    <MenuButton className="flex justify-center items-center">
      <img src={user?.profilePic} alt="no image found" height={30} width={30} className='rounded'/>
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
      <button className='className="block data-[focus]:bg-blue-100' onClick={logout}>Logout</button>
      </MenuItem>
    </MenuItems>
  </Menu>
  )
}

export default DropDownMenu
