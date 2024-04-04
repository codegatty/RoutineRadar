import React from 'react'

import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState, } from 'react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigation } from 'react-router-dom'
import DropDownMenu from '../UIComponents/DropDownMenu'
function Header() {
  const navigator = useNavigation()
  return (
    <div className="bg-white h-16 flex flex-row justify-between items-center px-5">
      <div className=''>
        <h1 className='text-center text-3xl'>Admin panel</h1>
      </div>
      <div>
        <DropDownMenu/>
      </div>
    </div>
  )
}

export default Header
