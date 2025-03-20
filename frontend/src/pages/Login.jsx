import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import { loginUser } from '../service/api'
import { Link, useNavigate } from 'react-router-dom'
import { validationSchema } from '../service/utlis'
import useAuthStore from '../store/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import CustomInput from '@/components/CustomInput'
const Login = () => {
    const { login, error, setError } = useAuthStore()
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {

            navigate("/home")
            login(data?.token)

        },
        onError: (error) => {
            setError(error?.response?.data?.message || "Error occured")
        }
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: mutate
    })
    const inputFields = [{
        id: 1,
        value: "username"
    }, {
        id: 2,
        value: "password"
    }]
    return (
        <div className=' h-screen flex flex-col  gap-4 items-center justify-center bg-zinc-950  '>
            <Card className="w-[25%] shadow-md shadow-cyan-300 bg-zinc-900 border-none">
                <CardHeader className="!gap-0">
                    <CardTitle className=" text-center text-3xl font-extrabold  text-cyan-500">Login</CardTitle>
                </CardHeader>
                <CardContent className="text-white border-none ">
                    <Form>

                        <form onSubmit={formik.handleSubmit} className='flex flex-col    p-5 border-none'>
                            {
                                inputFields.length && inputFields?.map((val) => (
                                    <div key={val.id} >
                                        <CustomInput field={val.value} formik={formik} />
                                    </div>
                                ))
                            }
                            {error ? <span className='bg-red-500 text-white text-md font-semibold py-1 px-10 rounded-md my-3'>{error}</span> : ""}
                            <Button type='submit' size="lg" className="cursor-pointer  bg-cyan-500 hover:bg-cyan-600 text-white w-fit flex self-center" >Login</Button>
                            <Link to="/register" className='text-sm font-semibold text-white text-center'> Don't have an account? <Button className="text-sm  font-semibold ml-0 pl-1 cursor-pointer text-cyan-500 " variant="link">Register</Button> </Link>
                        </form>
                    </Form>


                </CardContent>

            </Card>

        </div>
    )
}

export default Login