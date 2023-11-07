import { z } from "zod";

export const signupServerSchema = z.object({
  firstname: z.string().min(3, { message: "First name is required" }).max(255),
  lastname: z.string().min(3, { message: "Last name is required" }).max(255),
  email: z.string().email().min(5, { message: "Email is required" }).max(255),
  password: z.string().min(3, { message: "Password is required" }).max(255),
})

export const passwordConfirmSchema =
  z.object({
    password: z.string().min(3, { message: "Password is required" }).max(255),
    confirmPassword: z.string().min(3, { message: "Password is required" }).max(255).optional(),
  })


export const signupClientSchema = signupServerSchema.merge(passwordConfirmSchema).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})