import React from 'react'
import ThemeToggle from './ThemeToggle'
import useAuthStore from '../store/authStore'

const Header = ({ setOpenCreatePopop }) => {
  const { logout } = useAuthStore()
  return (
    <div className='flex justify-between items-center  mx-auto'>
      <h1 className='text-4xl font-semibold tracking-wider text-white'>Tasks List</h1>
      <div className='flex space-x-4 items-center'>
        <button className=' rounded-md cursor-pointer text-md text-white bg-blue-500 font-semibold px-8 py-2 ' onClick={() => setOpenCreatePopop(true)}>Create </button>
        <button className=' rounded-md cursor-pointer text-md text-white border-blue-500 font-semibold px-8 py-2 ' onClick={() => logout()}>Logout </button>

        {/* <ThemeToggle /> */}
      </div>
    </div>
  )
}

export default Header