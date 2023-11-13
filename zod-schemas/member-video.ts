import { z } from "zod";

export const memberAddVideoSchema = z.object({
  video: z.string().max(1024),
})

export const memberEditVideoSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }).max(255),
  description: z.string().max(1024),
  poster: z.string().max(1024),
  categoryId: z.string().min(1, { message: "Category is required" }).max(255),
})
export const memberVideoSchema = memberAddVideoSchema.merge(memberEditVideoSchema)