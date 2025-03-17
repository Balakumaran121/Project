import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import { registerUser } from '../service/api'
import { Link, useNavigate } from 'react-router-dom'
import { validationSchema } from '../service/utlis'
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import CustomInput from '@/components/CustomInput'
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
    const inputFields = [{
        id: 1,
        value: "username"
    }, {
        id: 2,
        value: "password"
    }]
    return (
        <div className=' h-screen flex flex-col gap-4 items-center justify-center bg-zinc-950 text-white  '>
            <Card className="w-[25%] shadow-md shadow-cyan-300 bg-zinc-900 border-none">
                < CardHeader>
                    <CardTitle className="text-center text-cyan-500 text-3xl font-extrabold">Register</CardTitle>
                </CardHeader>
                <CardContent className="text-white border-none">
                    <Form>
                        <form onSubmit={formik.handleSubmit} className='flex flex-col border-none  p-5'>
                            {
                                inputFields.length && inputFields.map((val) => (
                                    <div key={val.id}>
                                        <CustomInput field={val.value} formik={formik} />
                                    </div>
                                ))
                            }
                            <Button className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 flex self-center w-fit" type='submit' size='lg' >Register</Button>
                            <Link to="/" className='text-sm font-semibold text-center'>Already you've account? <Button variant="link" className="text-sm font-semibold ml-0 pl-1 cursor-pointer text-cyan-500">Login</Button> </Link>
                        </form>
                    </Form>
                </CardContent>
            </Card>


        </div>
    )
}

export default Register