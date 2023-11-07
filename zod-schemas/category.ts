import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, { message: "Title is required" }).max(255),
  slug: z.string().min(3, { message: "Slug is required" }).max(255),
  description: z.string().max(1024).max(255),
})