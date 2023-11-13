import prisma from "@/lib/db"
import route from "@/lib/routes";
import { Video } from "@prisma/client";

export const getCategories = async () => {
  return await prisma.category.findMany({
    take: 100,
  })
}




export const getVideo = async (videoId: string, userId: string) => {
  console.log('videoId, userId', videoId, userId);

  return await prisma.video.findUnique({
    where: {
      id: videoId,
      userId: userId
    }
  })
}