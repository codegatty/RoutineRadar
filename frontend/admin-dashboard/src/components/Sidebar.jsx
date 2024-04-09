import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { GiRadarCrossSection } from 'react-icons/gi'
import { IconContext } from 'react-icons'
import classNames from 'classnames';



function Sidebar() {
  const classesNonActiveLink="flex flex-row p-3 text-xl hover:bg-neutral-300 hover:text-black"
  const classesActiveLink="flex flex-row p-3 text-xl bg-neutral-300 text-black"

  function activeFinder({isActive}){
    return isActive?classesActiveLink:classesNonActiveLink
  }

  return (
    <div className="bg-neutral-900 flex flex-col text-white w-60 ">
      <div className="bg-neutral-300 flex-2 flex flex-col justify-center items-center ">
        <IconContext.Provider value={{ color: 'black', size: '50px' }}>
          <GiRadarCrossSection />
        </IconContext.Provider>
        <h1 className="text-3xl text-black text-center">RoutineRadar</h1>
      </div>
      <div className="flex-1">
        <ul className='mt-3'>
          <li>
            <NavLink to="/dashboard/analytics" className={activeFinder} >Analytics</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users" className={activeFinder}>Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/challenges" className={activeFinder}>Challenges</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admins" className={activeFinder}>Admins</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-2 bg-red-500 ">
        <button className='font-bold p-2 '>
        <Link>Logout</Link>
        </button>
        
      </div>
    </div>
  )
}

export default Sidebar
