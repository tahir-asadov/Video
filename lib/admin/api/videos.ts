import { Video } from "@prisma/client";
import route from "../../routes";

export const apiGetVideos = async (currentPage: number) => {
  const res = await fetch(route('api.admin.videos', { 'currentPage': currentPage.toString() })).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res
}

export const apiAddVideo = async ({ title, description, categoryId, userId, video, poster, published }: Omit<Video, "uploadDate" | "id">) => {
  console.log(route('api.admin.video'));
  const res = await fetch(route('api.admin.video'), {
    method: 'POST',
    body: JSON.stringify({
      title, description, categoryId, userId, video, poster, published
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res
}

export const apiUpdateVideo = async ({ id, title, description, categoryId, userId, video, poster, published }: Omit<Video, "uploadDate">) => {
  console.log(route('api.admin.video'));
  const res = await fetch(route('api.admin.video'), {
    method: 'PATCH',
    body: JSON.stringify({
      id, title, description, categoryId, userId, video, poster, published
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  // const result = await res.json();

  return res;
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

