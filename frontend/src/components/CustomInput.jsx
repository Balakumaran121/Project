import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

const CustomInput = ({ field,formik }) => {
    console.log(formik.errors,field)
    return (
        <div className=' flex flex-col gap-2 h-24'>
            <Label htmlFor={`${field}`} className="text-lg capitalize text-white">{field}</Label>
            <Input type="text" name={field} autoComplete="off" className="placeholder:text-white/50 focus:shadow-cyan-500/50 focus-visible:shadow-lg outline-none  border-b-[1px] border-cyan-500 border-t-0 border-x-0   foucs:outline-none focus-visible:ring-[0px] focus:border-none  tracking-wider selection:bg-cyan-500 selection:text-white text-white " placeholder="Enter your password" value={formik.values[field]} onChange={formik.handleChange} />
            {formik.touched[field] && formik.errors[field] && <span className='text-sm text-red-500'>{formik.errors[field]}</span>}

        </div>
    )
}

export default CustomInput