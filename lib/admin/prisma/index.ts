import prisma from "@/lib/db"

export const getCategories = async () => {
  return await prisma.category.findMany({
    take: 100,
  })
}

export const getVideos = async () => {
  return await prisma.video.findMany({
    take: 100,
  })
}

export const getUsers = async () => {
  return await prisma.user.findMany({
    take: 100,
  })
}

export const getVideo = async (videoId: string) => {
  return await prisma.video.findUnique({
    where: {
      id: videoId
    }
  })
}

export const getCategory = async (categoryId: string) => {
  return await prisma.category.findUnique({
    where: {
      id: categoryId
    }
  })
}
