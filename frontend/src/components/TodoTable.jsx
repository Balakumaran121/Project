import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';

const TodoTable = ({ headers, finalList, handleSelectTodo }) => {


  const [search, setSearch] = useState("");

  const filteredList = finalList?.filter(todo =>
    todo?.user?.toLowerCase().includes(search.toLowerCase())
  );

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
            filteredList?.length ? filteredList?.map((todo) => (
              <tr className=' ' key={todo?._id}>
                <td className='px-4 py-2 font-medium whitespace-nowrap text-white'>{todo?.text}</td>
                <td className='px-4 py-2 whitespace-nowrap text-white'>{todo?.priority}</td>
                <td className='px-4 py-2 whitespace-nowrap text-white'>{todo?.deadline}</td>
                <td className='space-x-5 py-2'>
                  <Button className="cursor-pointer" onClick={() => handleSelectTodo(todo._id, "view")} variant="secondary">View</Button>
                  <Button className="cursor-pointer text-white bg-cyan-500 hover:bg-cyan-600" onClick={() => handleSelectTodo(todo._id, "edit")}  >Edit</Button>
                  <Button className="cursor-pointer" onClick={() => handleSelectTodo(todo._id, "delete")} variant="destructive">Delete</Button>
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