import React from 'react'
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='h-full w-full text-white border-r-gray-200 shadow-white shadow-sm flex items-center justify-center font-sans font-bold text-xl'>
        <ul>
          <li>
            <NavLink 
              to='/'
              className={({isActive}) => `${isActive ? 'text-blue-700' : '' }`} >
              All
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/categories'
              className={({isActive}) => `${isActive ? 'text-blue-700' : '' }`} >
              By Category
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/revision'
              className={({isActive}) => `${isActive ? 'text-blue-700' : '' }`} >
              Revision
            </NavLink>
          </li>
        </ul>
    </div>
  )
}

export default Sidebar