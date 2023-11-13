import { z } from "zod";

export const memberAccountServerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(255),
  lastName: z.string().min(1, { message: "Last name is required" }).max(255),
  password: z.string().max(255).optional(),
})

export const passwordConfirmSchema =
  z.object({
    password: z.string().max(255).optional(),
    confirmPassword: z.string().max(255).optional(),
  })


export const memberAccountClientSchema = memberAccountServerSchema.merge(passwordConfirmSchema).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})