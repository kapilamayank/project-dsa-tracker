import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function LoginSignupForm() {
    return (
    <div className='text-white w-[30%] min-w-[300px] self-center justify-self-center'>
        <ul className='bg-gray-700 flex flex-row text-lg gap-2 p-0'>
            <li>
                <NavLink 
                    to='/auth/login'
                    className={({isActive}) => {
                        return 'ml-1 rounded-t-3xl inline-block p-2 ' + ((isActive) ? 'bg-gray-950 w-full h-full' : 'w-full h-full')
                    }}>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/auth/signup'
                    className={({isActive}) => {
                        return 'rounded-t-3xl inline-block p-2 ' + ((isActive) ? 'bg-gray-950 w-full h-full' : 'w-full h-full')
                    }}>
                    Signup
                </NavLink>
            </li>
        </ul>
        <Outlet />
    </div>
  )
}

export default LoginSignupForm