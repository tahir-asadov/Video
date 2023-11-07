import { Role } from "@prisma/client";
import { z } from "zod";

export const userEditSchema = z.object({
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  active: z.boolean(),
  email: z.string().email().min(5, { message: "Email is required" }).max(255),
  role: z.nativeEnum(Role),
  password: z.string().max(40).optional(),
})


export const userAddSchema = z.object({
  password: z.string().min(3).max(40),
})

export const userSchema = userEditSchema.merge(userAddSchema)