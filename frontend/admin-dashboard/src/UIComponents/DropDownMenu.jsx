import React from 'react'
import { Menu } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { FaCircleUser } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import {useNavigate} from 'react-router-dom'

function DropDownMenu() {

  const {getCurrentAdmin}=useAuth();
  const logOut =useLogout();
  const admin=getCurrentAdmin();
  const navigate=useNavigate();  

  async function logoutHandler(){
    await logOut();
    navigate("/");
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        
        <div className='flex flex-col'>
        <FaCircleUser fontSize={40} color="#D1D5DB"/>
        <span className='text-black'>{admin?.adminName}</span>
        </div>
        </Menu.Button>
      </div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>{({ active }) => <Link to="/dashboard/admins/admin" state={{operation:"edit",admin:admin}}>Account</Link>}</Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>{({ active }) => <button onClick={logoutHandler}>Sign out</button>}</Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropDownMenu
