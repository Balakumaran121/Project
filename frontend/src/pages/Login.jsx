import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import { loginUser } from '../service/api'
import { Link, useNavigate } from 'react-router-dom'
import { validationSchema } from '../service/utlis'
import useAuthStore from '../store/authStore';
const Login = () => {
    const { login,error,setError } = useAuthStore()
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {

            navigate("/home")
            login(data?.token)

        },
        onError:(error)=>{
            setError(error?.response?.data?.message||"Error occured")
        }
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    })
    const handleSubmit = (values) => {
        mutate(values)
    }
    return (
        <div className=' h-screen flex flex-col gap-4 items-center justify-center bg-[#303030] text-white  '>
            <h1 className='text-5xl font-semibold'>Login</h1>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-10 border  p-5'>
                <div className=' flex flex-col'>

                    <label htmlFor="">Username</label>
                    <input type="text" name="username" className='py-3 w-full border-b border-white outline-none' value={formik.username} onChange={formik.handleChange} />
                    {formik.touched.username && formik.errors.username && <span>{formik.errors.username}</span>}
                </div>
                <div className='flex flex-col'>

                    <label htmlFor="">Password</label>
                    <input type="text" name="password" className='py-3 w-full border-b border-white outline-none' value={formik.password} onChange={formik.handleChange} />
                    {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                </div>
                {error?<span className='bg-red-500 text-white text-md font-semibold py-1 px-10 rounded-md'>{error}</span>:""}
                <button type='submit' className='px-8 py-2 rounded-md cursor-pointer text-white text-md bg-blue-500 font-semibold'>Login</button>
            </form>
            <Link to="/register" className='text-sm font-semibold'> Don't have an account? <span className='bg-blue-500 bg-clip-text text-transparent'>Register</span> </Link>
            {}
        </div>
    )
}

export default Login