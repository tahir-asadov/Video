import route from "@/lib/routes";
import { Video } from "@prisma/client";

export const apiAddVideo = async ({ title, description, categoryId, video, poster }: Omit<Video, "uploadDate" | "id" | "userId" | "published">) => {
  console.log(route('api.member.video'));
  const res = await fetch(route('api.member.video'), {
    method: 'POST',
    body: JSON.stringify({
      title, description, categoryId, video, poster
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res;
}


export const apiUpdateVideo = async ({ id, title, description, categoryId, poster }: Omit<Video, "userId" | "video" | "published">) => {
  console.log(route('api.member.video'));
  const res = await fetch(route('api.member.video'), {
    method: 'PATCH',
    body: JSON.stringify({
      id, title, description, categoryId, poster
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res;
}

export const apiDeleteVideo = async (id: string) => {
  console.log(route('api.member.video'));
  const res = await fetch(route('api.member.video'), {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res;
}


export const apiGetVideos = async ({ currentPage }: { currentPage: number }) => {
  console.log(route('api.member.videos', { currentPage: currentPage.toString() }));
  const videos = await fetch(route('api.member.videos', { currentPage: currentPage.toString() })).then(res => res.json()).then(data => data.videos);

  return videos;
}

// export const apiDeleteVideo = async (id: string) => {
//   console.log(route('api.member.video'));
//   const res = await fetch(route('api.member.video'), {
//     method: 'DELETE',
//     body: JSON.stringify({
//       id
//     })
//   });
//   return await res.json();
// }


