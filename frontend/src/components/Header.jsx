import React from 'react'
// import ThemeToggle from './ThemeToggle'
import useAuthStore from '../store/authStore'
import { Button } from './ui/button'

const Header = ({ setOpenCreatePopop }) => {
  const { logout } = useAuthStore()
  return (
    <div className='flex justify-between items-center  mx-auto'>
      <h1 className='text-4xl font-semibold tracking-wider text-white'>Tasks List</h1>
      <div className='flex space-x-4 items-center'>
        <Button size="lg" className="px-8 text-white hover:text-white cursor-pointer bg-cyan-500 hover:bg-cyan-600" variant="ghost" onClick={() => setOpenCreatePopop(true)}>Create </Button>
        <Button className="px-8 cursor-pointer" variant="outline" onClick={() => logout()}>Logout </Button>

        {/* <ThemeToggle /> */}
      </div>
    </div>
  )
}

export default Header