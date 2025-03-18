import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import { loginUser } from '../service/api'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidation } from '../service/utlis'
import useAuthStore from '../store/authStore'
import ProfileImg from '../assets/images/LoginProfile.png';
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
            password: "",
        },
        validationSchema: loginValidation,
        onSubmit: (values) => handleSubmit(values)
    })
    const handleSubmit = (values) => {
        mutate(values)
    }
    return (
        <div className=' h-screen flex flex-col select-none gap-4 items-center justify-center bg-[#4da3d2] text-white  '>
            <form onSubmit={formik.handleSubmit} className='flex flex-col w-[500px] gap-y-8 rounded-4xl shadow-lg  bg-[#6fb3d8] bg-blur-xs p-12 pt-24 relative'>
            <div className='flex justify-center items-center w-32 h-32  pt-4 overflow-hidden rounded-full  bg-[#3485bd]/50 absolute -top-[12%] left-0 right-0 mx-auto '>
                <img src={ProfileImg} alt="profile" className='w-full h-full object-cover scale-[0.98] backdrop-blur-l' />
            </div>
            <h1 className='font-extrabold text-2xl uppercase  text-center'>Login</h1>
            <div className='flex flex-col gap-y-4'>
                <div className=' flex flex-col'>
                    <input type="text" name="username" placeholder='Username' className='w-full rounded-[8px] h-11 px-4 bg-white outline-none capitalize tracking-[1px] placeholder:tracking-[0px] placeholder:font-semibold text-[#3485bd]' value={formik.username} onChange={formik.handleChange} />
                    {formik.touched.username && formik.errors.username && <span>{formik.errors.username}</span>}
                </div>
                <div className='flex flex-col'>
                    <input type="password" name="password" placeholder='Password' className='w-full rounded-[8px] h-11 px-4 bg-white outline-none capitalize tracking-[6px] placeholder:tracking-[0px] placeholder:font-semibold text-[#3485bd]' value={formik.password} onChange={formik.handleChange} />
                    {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                </div>
            </div>
               
               <div className='flex flex-col gap-y-4 relative'>
                 <button type='submit' className='py-2 w-[40%] rounded-[25px] mx-auto cursor-pointer text-white text-md bg-[#3485bd] font-semibold'>Login</button>
                 <p  className='text-sm text-center cursor-default'> Don't have an account? <Link to="/register">
                 <span className='font-semibold'>Create account</span></Link>  </p>
                {error ? <span className='absolute -bottom-3 mx-auto left-0 right-0 animate-bounce bg-red-500 text-white text-md font-semibold py-1 px-10 rounded-md'>{error}</span>:""}
                </div> 
            </form>
            {}
        </div>
    )
}

export default Login