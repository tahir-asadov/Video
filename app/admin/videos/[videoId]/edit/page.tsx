import Container from '@/components/admin/container';
import EditVideo from '@/components/admin/forms/edit-video';
import { getCategories, getUsers, getVideo } from '@/lib/admin/prisma';
// import QueryProvider from '@/providers/query-provider';
import React from 'react';

export default async function EditVideoPage({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const categories = await getCategories();
  const users = await getUsers();
  const video = await getVideo(videoId);
  return (
    <Container>
      {/* <QueryProvider> */}
      {video ? (
        <EditVideo categories={categories} users={users} video={video} />
      ) : (
        <p>video not found</p>
      )}
      {/* </QueryProvider> */}
    </Container>
  );
}
