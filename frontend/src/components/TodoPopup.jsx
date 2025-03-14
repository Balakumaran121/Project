/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo, editTodo } from '../service/api'
const TodoPopup = ({ isOpen, onClose, title, editTodoData }) => {


  const validationSchema = Yup.object({
    text: Yup.string().required('Required'),
    priority: Yup.string().required('Required'),
    user:Yup.string().required("Required")
  })
  // const isInitialized = useRef(false)
  const formik = useFormik({
    initialValues: {
      text: "",
      priority: "",
      user:""
    },
    validationSchema,
    onSubmit: (values) => {
      const data = { ...values, deadline: '4/3/25'}
      handleSubmit(data)
    }

  })
  useEffect(() => {
    if (title === "Edit" && editTodoData) {
      formik.setValues(editTodoData)
    } else {
      formik.resetForm()
    }
  }, [editTodoData, title])


  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
      onClose()
      formik.resetForm()
    },
    // onError:()=>{
    //   onClose()
    // }
  })

  const { mutate: editMutate } = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
      onClose()
    }
  })
  const handleSubmit = async (values) => {
    if (title === "Add") {
      mutate(values)
    } else if (title === "Edit") {
      editMutate({ id: editTodoData?._id, updatedFields: values })
    }
  }
  if (!isOpen) return null
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25 z-10'>


      <div className='bg-[#434343] flex flex-col p-10 rounded-md w-[30%]'>
        <label htmlFor="" className='text-xl font-bold text-white py-2'>{title} Task </label>
        <input type="text" placeholder='Enter task name' className='outline-none  border-b border-slate-500 rounded-md px-2 py-2 placeholder:text-slate-300 placeholder:font-semibold text-white' name='text' value={formik.values.text} onChange={formik.handleChange} />
        {formik.errors.text ? <span className='text-sm text-red-500 m-2'>{formik.errors.text}</span> : ""}
        <label htmlFor="" className='text-xl  font-bold text-white py-2'>Priority</label>
        <input type="text" placeholder='Enter priority level' className='outline-none border-b border-slate-500 rounded-md px-2 py-2 placeholder:text-slate-300 text-white placeholder:font-semibold' name='priority' value={formik.values.priority} onChange={formik.handleChange} />
        {formik.errors.priority ? <span className='text-sm text-red-500 m-2'>{formik.errors.priority}</span> : ""}
        <label htmlFor="" className='text-xl  font-bold text-white py-2'>User Name</label>
        <input type="text" placeholder='Enter priority level' className='outline-none border-b border-slate-500 rounded-md px-2 py-2 placeholder:text-slate-300 text-white placeholder:font-semibold' name='user' value={formik.values.user} onChange={formik.handleChange} />
        {formik.errors.user ? <span className='text-sm text-red-500 m-2'>{formik.errors.user}</span> : ""}
        <div className='flex items-center justify-center gap-4'>
          <button onClick={onClose} className='px-8 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer w-fit  rounded-md inset-0 z-10 my-4 text-white font-normal'>Close</button>
          <button type='submit' onClick={formik.handleSubmit} className='px-8 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer w-fit  rounded-md inset-0 z-10 my-4 text-white font-normal'>Submit</button>
        </div>
      </div>

    </div>
  )
}

export default TodoPopup