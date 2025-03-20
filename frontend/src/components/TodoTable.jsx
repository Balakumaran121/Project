import React, { useState } from 'react'

const TodoTable = ({headers,finalList,handleSelectTodo}) => {


const [search, setSearch] = useState("");

const filteredList = finalList?.filter(todo =>
  todo?.user?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className='flex flex-col gap-2 mt-10'>
      <div className=' flex justify-end text-white'>
      <input   value={search} onChange={(e) => setSearch(e.target.value)}
      type="text" placeholder="Enter the name" className='bg-[#434343] py-2 px-4 rounded-md outline-none' />
      </div>
    <table className='min-w-full divide-y-2 divide-gray-200 dark:bg-gray-400  text-sm table-fixed'>
        <thead className='ltr:text-left rtl:text-right '>
          <tr>
            {headers.map((header) => (
              <th key={header?.id} className='px-4 w-[20%] py-2 font-extrabold text-md whitespace-nowrap text-white'>{header?.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {
            finalList?.length ? finalList?.map((todo) => (
              <tr className=' ' key={todo?._id}>
                <td className='px-4 py-2 font-medium whitespace-nowrap text-white'>{todo?.text}</td>
                <td className='px-4 py-2 whitespace-nowrap text-white'>{todo?.priority}</td>
                <td className='px-4 py-2 whitespace-nowrap text-white'>{todo?.deadline}</td>
                <td className='px-4 py-2 whitespace-nowrap text-white space-x-4'>  
                  <button onClick={()=>handleSelectTodo(todo,"status")} className={`px-2 flex items-center py-[6px] ${todo?.status ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} rounded-md text-white text-md font-semibold overflow-hidden cursor-pointer`}> 
                    In-Complete
                    <span className=' flex px-1.5 justify-center items-center rounded-[6px] text-[20px]'>{!todo?.status  ? (<span > &#x2715;</span> ):(<span className='text-white'>&#10003;</span> )} </span>
                  </button>
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-white space-x-4'>
                   <button onClick={()=>handleSelectTodo(todo._id,"view")} className='px-6 py-[9px] bg-blue-500 hover:bg-blue-600 rounded-md text-white text-md font-semibold cursor-pointer'>View</button>
                   <button onClick={()=>handleSelectTodo(todo._id,"edit")} className='px-6 py-2 border border-blue-500 hover:bg-blue-500 rounded-md hover:text-white text-blue-500 text-md font-semibold cursor-pointer'>Edit</button>
                 {
                  todo?.status  && (<button onClick={()=>handleSelectTodo(todo._id,"delete")} className='bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer rounded-md px-6 py-[9px]'>Delete</button> )
                 }
                   
                </td>
            </tr>
            )) :
              <tr >
                <td colSpan={headers.length} className='bg-[#434343] text-white h-[72vh] text-center py-4'>No records found</td>
              </tr>
          }
        </tbody>
      </table>
    </div>

  )
}

export default TodoTable