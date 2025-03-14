import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import { registerUser } from '../service/api'
import { Link, useNavigate } from 'react-router-dom'
import { validationSchema } from '../service/utlis'
const Register = () => {
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate("/")
        }
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => mutate(values)
    })
    return (
        <div className=' h-screen flex flex-col gap-4 items-center justify-center bg-[#303030] text-white  '>
            <h1 className='text-xl font-semibold'>Register</h1>
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
                <button type='submit' className='px-8 py-2 rounded-md cursor-pointer text-white text-md bg-blue-500 font-semibold'>Register</button>
            </form>
            <Link to="/" className='text-sm font-semibold'>Already you've account? <span className='bg-blue-500 bg-clip-text text-transparent'>Login</span> </Link>
        </div>
    )
}

export default Register