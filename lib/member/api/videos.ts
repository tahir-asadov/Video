import route from "@/lib/routes";
import { Video } from "@prisma/client";

export const apiAddVideo = async ({ title, description, categoryId, video, poster }: Omit<Video, "uploadDate" | "id" | "userId">) => {
  console.log(route('api.member.video'));
  const res = await fetch(route('api.member.video'), {
    method: 'POST',
    body: JSON.stringify({
      title, description, categoryId, video, poster
    })
  });
  return await res.json();
}

export const apiGetVideos = async ({ currentPage }: { currentPage: number }) => {
  console.log(route('api.member.videos', { currentPage: currentPage.toString() }));
  const videos = await fetch(route('api.member.videos', { currentPage: currentPage.toString() })).then(res => res.json()).then(data => data.videos);

  return videos;
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


