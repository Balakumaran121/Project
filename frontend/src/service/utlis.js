import * as Yup from "yup"
export const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    role: Yup.string().required("Please select a role"),
    password: Yup.string().required("Required field"),

})

export const loginValidation = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Required field"),
})