import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Equal, Eye, Pencil, Trash2 } from 'lucide-react';

const TodoTable = ({ headers, finalList, handleSelectTodo }) => {


  const [search, setSearch] = useState("");


const filteredList = finalList?.filter(todo=>Object.values(todo).some(val=>(typeof val==='string' && val.toLowerCase() ===search?.toLowerCase())||(val?.username && val.username.toLowerCase() ===search?.toLowerCase())))

const getPriorityIcons = (field)=>{
  switch(field?.toLowerCase()){
    case 'high':
      return <ChevronUp className='text-red-500'/>;
    case 'low':
      return <ChevronDown className="text-yellow-500"/>;
    default:
      return <Equal  className="text-cyan-500"/>
  }
}
const displayedList = filteredList?.length >0 && search ? filteredList:finalList
  return (
    <div className='flex flex-col gap-2 mt-10'>
      <div className=' flex justify-end text-white'>
        <Input value={search} onChange={(e) => setSearch(e.target.value)}
          type="text" placeholder="Enter the name" className='bg-zinc-700 focus-visible:ring-cyan-500 tracking-wider placeholder:font-semibold border-none  placeholder:text-white w-[20%] py-2 px-4 rounded-md outline-none' />
      </div>
      <table className='min-w-full divide-y-2 divide-gray-200 dark:bg-gray-400  text-sm table-fixed'>
        <thead className='ltr:text-left rtl:text-right '>
          <tr>
            {headers.map((header) => (
              <th key={header?.id} className='px-4 w-1/4 py-2 font-extrabold text-lg whitespace-nowrap text-white'>{header?.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {
            displayedList ?displayedList?.map((todo) => (
              <tr className=' ' key={todo?._id}>
                <td className='px-4 py-2 font-medium whitespace-nowrap text-white'>{todo?.text}</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap text-white'>{todo?.user?.username}</td>
                <td className="px-4 py-2 whitespace-nowrap text-white flex items-center">
                  <span>{getPriorityIcons(todo?.priority)}</span>
                  <p >

                  {todo?.priority}
                  </p>
                  </td>
                <td className='px-4 py-2 whitespace-nowrap text-white'>{todo?.deadline}</td>  
                <td className='px-4 py-2 whitespace-nowrap text-white'>
                  <p className={`${todo.status?"bg-green-500":"bg-red-500"} rounded-md w-fit px-2`}>{todo?.status?"Active":"In-active"}</p>
                </td>
                <td className='space-x-1 py-2 flex'>
                  <Button className="cursor-pointer text-white bg-zinc-800 " onClick={() => handleSelectTodo(todo._id, "view")} variant="icon"><Eye /></Button>
                  <Button className="cursor-pointer text-white bg-cyan-500 " onClick={() => handleSelectTodo(todo._id, "edit")} variant="icon" ><Pencil /></Button>
                  <Button className="cursor-pointer text-white bg-red-500 " onClick={() => handleSelectTodo(todo._id, "delete")} variant="icon"><Trash2 /></Button>
                </td>
              </tr>
            )) :
              <tr >
                <td colSpan={headers.length} className='bg-zinc-950 text-4xl text-cyan-500 font-bold   h-[72vh] text-center py-4'>No records found</td>
              </tr>
          }
        </tbody>
      </table>
    </div>

  )
}

export default TodoTable