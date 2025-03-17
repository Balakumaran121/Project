/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo, editTodo } from '../service/api'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import CustomInput from './CustomInput'
const TodoPopup = ({ isOpen, onClose, title, editTodoData }) => {


  const validationSchema = Yup.object({
    text: Yup.string().required('Text Required'),
    priority: Yup.string().required('Priority Required'),
    user: Yup.string().required("User Required")
  })
  // const isInitialized = useRef(false)
  const formik = useFormik({
    initialValues: {
      text: "",
      priority: "",
      user: ""
    },
    validationSchema,
    onSubmit: (values) => {
      const data = { ...values, deadline: '4/3/25' }
      handleSubmit(data)
    }

  })
  useEffect(() => {
    if (title === "Edit" && editTodoData) {
      formik.setValues(editTodoData)
    }
    else {
      formik.resetForm()
      formik.setErrors({})
    }
  }, [editTodoData, title, isOpen])


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

  const inputFields = [


    {id:1,
      value:"text"
    },
    {
      id:2,
      value:'priority'
    },
    {id:3,
      value:"user"
    }
  ]
  if (!isOpen) return null
  return (
    <div className='fixed top-0 left-0 w-full h-full flex  justify-center items-center bg-zinc-950 bg-opacity-25 z-10'>

      <div className='bg-zinc-900 flex flex-col p-10 rounded-md w-[30%] shadow-sm shadow-cyan-200'>
        <h1 className='text-xl text-white font-semibold text-center pb-3'>{title} Task</h1>
        
        {
          inputFields.length && inputFields?.map((val)=>(
            <CustomInput field={val.value} formik={formik}/>
          ))
        }
        
        <div className='flex items-center justify-center gap-20 mt-4'>
          <Button onClick={onClose} variant="outline" className="cursor-pointer text-black px-10">Close</Button>
          <Button type='submit' className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 px-10" onClick={formik.handleSubmit} >Submit</Button>
        </div>
      </div>

    </div>
  )
}

export default TodoPopup