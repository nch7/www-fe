import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Must be valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
})

export type LoginFormData = yup.InferType<typeof loginSchema>;