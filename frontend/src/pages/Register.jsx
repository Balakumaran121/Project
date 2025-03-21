import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { registerUser } from '../service/api';
import { Link, useNavigate } from 'react-router-dom';
import { validationSchema } from '../service/utlis';
import useClickOutside from '../commonHooks/useClickOutside';

const Register = () => {
    const [roleToggle, setRoleToggle] = useState(false);
    const [isError, setIsError] = useState('');
    const roleData = [
        { id: 1, name: 'admin' },
        { id: 2, name: 'user' }
    ];

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            navigate('/');
        },
        onError: (error) => {
            setIsError(error?.response?.data?.message);
            setTimeout(() => {
                setIsError('');
            }, 2500);
        }
    });
    

    const formik = useFormik({
        initialValues: {
            username: '',
            role: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => mutate(values)
    });

      useClickOutside(dropdownRef, () => setRoleToggle(false), roleToggle);

    return (
        <div className='h-screen flex flex-col select-none items-center justify-center bg-[#f9f9f9] text-gray-500'>
            <form onSubmit={formik.handleSubmit} className='flex flex-col w-[500px] gap-y-8 rounded-4xl s bg-white p-12'>
                <h1 className='font-extrabold text-2xl uppercase text-center'>Register</h1>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-col'>
                        <input type='text' name='username' placeholder='Username'
                            className='w-full rounded-[8px] h-11 px-4 bg-[#f5f5f5] outline-none capitalize tracking-[1px] placeholder:tracking-[0px] text-gray-500'
                            value={formik.values.username} onChange={formik.handleChange}
                        />
                        {formik.touched.username && formik.errors.username && <span>{formik.errors.username}</span>}
                    </div>
                    <div ref={dropdownRef} className='flex flex-col relative'>
                        <input type='text' name='role' placeholder='Select Role' readOnly
                            className='w-full rounded-[8px] h-11 px-4 bg-[#f5f5f5] outline-none capitalize tracking-[1px] placeholder:tracking-[0px] text-gray-500 cursor-pointer'
                            value={formik.values.role} onClick={() => setRoleToggle(!roleToggle)}
                        />
                        {formik.touched.role && formik.errors.role && <span>{formik.errors.role}</span>}

                        {roleToggle && (
                            <ul className='absolute top-12 left-0 w-full bg-[#f5f5f5] rounded-[8px] overflow-hidden text-gray-500'>
                                {roleData.map((role) => (
                                    <li
                                        key={role.id}
                                        onClick={() => {
                                            formik.setFieldValue('role', role.name);
                                            setRoleToggle(false);
                                        }}
                                        className='p-2 cursor-pointer capitalize hover:bg-blue-500/50'
                                    >
                                        {role.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <input type='password' name='password' placeholder='Password'
                            className='w-full rounded-[8px] h-11 px-4 bg-[#f5f5f5] outline-none tracking-[6px] placeholder:tracking-[0px] text-gray-500'
                            value={formik.values.password} onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                    </div>
                </div>
                <div className='flex flex-col gap-y-4 relative'>
                    <button type='submit' className='py-2 w-[40%] rounded-[25px] mx-auto cursor-pointer text-white text-md bg-blue-500 font-semibold'>
                        Create Account
                    </button>
                    <p className='text-sm text-center'>
                        Already have an account?{" "}
                        <Link to='/'>
                            <span className='font-semibold'>Login here</span>
                        </Link>
                    </p>
             { isError &&  <span className='absolute -bottom-4 mx-auto left-0 right-0 bg-red-500 text-center animate-bounce text-blue-500 text-md font-semibold py-1 px-10 rounded-md'>{isError}</span>}
                </div>
            </form>
        </div>
    );
};

export default Register;
