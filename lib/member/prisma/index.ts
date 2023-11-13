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

export const apiUpdateVideo = async ({ id, title, description, categoryId, poster }: Omit<Video, "userId" | "video">) => {
  console.log(route('api.member.video'));
  const res = await fetch(route('api.member.video'), {
    method: 'PATCH',
    body: JSON.stringify({
      id, title, description, categoryId, poster
    })
  });
  return await res.json();
}

export const apiDeleteVideo = async (id: string) => {
  console.log(route('api.member.video'));
  const res = await fetch(route('api.member.video'), {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  });
  return await res.json();
}

