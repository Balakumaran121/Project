import React, { useState } from 'react';
import deleteIcn from '../assets/images/delete.svg';
import view from '../assets/images/view.svg';
import edit from '../assets/images/edit.svg';


const TodoTable = ({headers,finalList,handleSelectTodo,setOpenCreatePopop}) => {


const [search, setSearch] = useState("");

const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };

const sortedData = finalList.sort((a, b) => {
    return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
});


const filteredList = finalList.filter(todo =>
  (todo?.text.toLowerCase().includes(search.toLowerCase()) || 
   todo?.user?.username.toLowerCase().includes(search.toLowerCase()))
);


  return (
    <div className='flex flex-col gap-y-10'>
      <div className=' flex justify-end gap-x-4 text-gray-400'>
      <input   value={search} onChange={(e) => setSearch(e.target.value)}
      type="text" placeholder="Find the Task or Name" className='bg-[#f5f5f5] py-2 px-4 rounded-md outline-none' />
        <button className=' rounded-md cursor-pointer text-md text-white bg-blue-500 font-semibold px-8 py-2 ' onClick={() => setOpenCreatePopop(true)}>Create Task</button>
      
      </div>
    <table className='min-w-full divide-y-2 divide-gray-200 dark:bg-gray-400 border-b  text-sm table-fixed'>
        <thead className='ltr:text-left rtl:text-right bg-blue-500/30 h-16 '>
          <tr>
            {headers.map((header) => (
              <th key={header?.id} className='px-4 w-[15%] py-2 font-extrabold text-md whitespace-nowrap text-gray-500 text-center'>{header?.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-'>
          {
            filteredList?.length ? filteredList?.map((todo) => (
              <tr className=' odd:bg-blue-400/10 even:bg-blue-200/5' key={todo?._id} >
                <td className='px-4 py-2 font-medium whitespace-nowrap text-gray-500 text-center'>{todo?.user?.username}</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap text-gray-500 text-center'>{todo?.text}</td>
                <td className='px-4 py-2 whitespace-nowrap text-gray-500 text-center'>{todo?.priority}</td>
                <td className='px-4 py-2 whitespace-nowrap text-gray-500 text-center'>{todo?.deadline}</td>
                <td className='px-4 py-2 whitespace-nowrap text-gray-500 space-x-4 '>  
                  <button onClick={()=>handleSelectTodo(todo,"status")} className={`w-[116px]  flex gap-x-2 mx-auto justify-center items-center border border-transparent py-[6px] ${todo?.status ? "bg-green-500/20 text-green-500 hover:border-green-500" : "bg-red-500/20 text-red-500 hover:border-red-500"} rounded-md   text-md overflow-hidden cursor-pointer`}> 
                  <span>{todo?.status ? "Complete" : "In-Complete"}</span> 
                    <span className={` flex  justify-center items-center rounded-full w-2 h-2 ${todo?.status ? "bg-green-500" : "bg-red-500"}`}> </span>
                  </button>
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-white space-x-4'>
                  <div className='w-[116px] mx-auto flex justify-start items-center gap-x-4 '>

                   <button onClick={()=>handleSelectTodo(todo._id,"view")} title='View' className=' font-normal rounded-md cursor-pointer'><img className='h-6 w-6' src={view} alt="delete" /></button>
                   <button onClick={()=>handleSelectTodo(todo._id,"edit")} title='Edit' className='font-normal rounded-md cursor-pointer'><img className='h-6  w-6' src={edit} alt="delete" /></button>
                 {
                  todo?.status  && (<button onClick={()=>handleSelectTodo(todo._id,"delete")} title='Delete' className=' text-red-500 cursor-pointer rounded-md '> <img className='h-6 w-6' src={deleteIcn} alt="delete" /></button> )
                 }
                  </div>
                   
                </td>
            </tr>
            )) :
              <tr >
                <td colSpan={headers.length} className='bg-blue-500/30 text-gray-400 font-semibold h-[69vh] text-center py-4'>No records found</td>
              </tr>
          }
        </tbody>
      </table>
    </div>

  )
}

export default TodoTable