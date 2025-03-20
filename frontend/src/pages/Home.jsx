
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Header from '../components/Header'
import TodoPopup from '../components/TodoPopup'
import TodoTable from '../components/TodoTable'
import useStore from '../store/todostore'
import { deleteTodo, getTodos } from '../service/api'
const Home = () => {
  const navigate = useNavigate()
  const [openCreatePopop, setOpenCreatePopop] = useState(false)
  const [title, setTitle] = useState('Add')
  const { data, error, isLoading } = useQuery({ queryKey: ['todos'], queryFn: getTodos, staleTime: 10000 })
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteTodo, onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })
  const finalList = data?.data || []
  const handleClose = () => {
    setOpenCreatePopop(false)
    setTitle("Add")
  }
  const headers = [{ id: 1, name: "Task" }, { id: 2, name: "Username" }, { id: 3, name: "Priority" }, { id: 4, name: "Deadline" }, { id: 5, name: "Status" }, { id: 6, name: "Actions" }]
  const { editTodoData, setEditTodo } = useStore()
  if (isLoading) return <Loader />
  if (error) return <div>Error...</div>
  const handleSelectTodo = (id, label) => {
    const selectedTodo = finalList.find((todo) => todo._id === id)
    if (!selectedTodo) return;
    setEditTodo(selectedTodo);
    switch (label) {
      case 'edit':
        setTitle('Edit')
        setOpenCreatePopop(true)
        break;
      case 'delete':
        mutate(id)
        break;
      default:
        navigate(`/view/${id}`, { state: { id } })
    }

  }

  return (
    <div className='overflow-x-auto p-10 bg-zinc-950 h-screen [scrollbar-width:none]'>
      <Header setOpenCreatePopop={setOpenCreatePopop} />
      <TodoTable headers={headers} finalList={finalList} handleSelectTodo={handleSelectTodo} />
      <TodoPopup isOpen={openCreatePopop} onClose={handleClose} title={title} editTodoData={editTodoData} />
    </div>

  )
}

export default Home