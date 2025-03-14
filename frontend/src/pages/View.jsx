import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { getSingleTodos } from '../service/api'

const View = () => {
  const navigate = useNavigate()

  const {state}=useLocation()
  const todoId = state?.id
  const { data, error, isLoading } = useQuery({ queryKey: ['todos', todoId], queryFn: () => getSingleTodos(todoId), staleTime: 10000, enabled: !!todoId })
  const handleBack=()=>{
   window.history.back()
  }
  if (isLoading) return <Loader/>
  if (error) return <div>Error...</div>
  return (
    <div className='h-screen bg-[#303030] text-white'>

        <h1 className='font-semibold pl-70 pt-20 flex items-center gap-2 cursor-pointer '> <span className='hover:bg-blue-500 hover:text-white rounded-full' onClick={handleBack}><ChevronLeft /></span> View Task</h1>
       <div className='flex w-full'>
        <div  className='w-4/12'>

       <img src="" alt="" className='w-96 ml-60 mt-10 h-96 rounded-4xl  bg-blue-500   '/>
        </div>
        <div className='w-4/12  mt-10 pl-10'>

       <p className=' mt-10 text-3xl font-bold'>{data?.data?.text||[]}</p>
       <p className=' mt-2 text-xl font-semibold'>{data?.data?.deadline||[]}</p>
       <p className=' mt-2 text-lg font-medium'>{data?.data?.priority||[]}</p>
        </div>
        <div className='w-4/12  mt-20  pl-10 '>
        <Trash2 className='hover:bg-blue-500 rounded-full p-2' size={70}/>
        </div>
       </div>
    </div>
  )
}

export default View