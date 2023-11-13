import { Video } from "@prisma/client";
import route from "../../routes";

export const apiGetVideos = async (currentPage: number) => {
  return await fetch(route('api.admin.videos', { 'currentPage': currentPage.toString() })).then(res => res.json()).then(data => data.videos);
}

export const apiAddVideo = async ({ title, description, categoryId, userId, video, poster }: Omit<Video, "uploadDate" | "id">) => {
  console.log(route('api.admin.video'));
  const res = await fetch(route('api.admin.video'), {
    method: 'POST',
    body: JSON.stringify({
      title, description, categoryId, userId, video, poster
    })
  });
  return await res.json();
}

export const apiUpdateVideo = async ({ id, title, description, categoryId, userId, video, poster, published }: Video) => {
  console.log(route('api.admin.video'));
  const res = await fetch(route('api.admin.video'), {
    method: 'PATCH',
    body: JSON.stringify({
      id, title, description, categoryId, userId, video, poster, published
    })
  });
  return await res.json();
}
export const apiDeleteVideo = async (id: string) => {
  console.log(route('api.admin.video'));
  const res = await fetch(route('api.admin.video'), {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  });
  return await res.json();
}

