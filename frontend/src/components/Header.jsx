import React from 'react'
import ThemeToggle from './ThemeToggle'
import useAuthStore from '../store/authStore'
import Logout from '../assets/images/shutdown.svg'

const Header = ({ setOpenCreatePopop }) => {
  const { logout } = useAuthStore()
  return (
    <div className='flex justify-between items-center h-20 mx-auto text-white px-12 bg-blue-500'>
      <h1 className='text-4xl font-semibold tracking-wider '>Tasks List</h1>
      <div className='flex space-x-4 items-center'>
        <span  onClick={() => logout()} className='p-1.5 w-10 h-10 border-2 border-blue-500/90 bg-white cursor-pointer rounded-full  ' title='Logout'>
          <img src={Logout} alt="Logout" />
        </span>
      </div>
    </div>
  )
}

export default Header