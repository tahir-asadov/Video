import { z } from "zod";

export const videoSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }).max(255),
  description: z.string().max(1024),
  poster: z.string().max(1024),
  video: z.string().max(1024),
  categoryId: z.string().min(1, { message: "Category is required" }).max(255),
  userId: z.string().min(1, { message: "User is required" }).max(255),
})