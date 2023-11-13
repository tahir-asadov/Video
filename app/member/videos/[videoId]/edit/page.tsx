import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminAccountInfo from '@/components/admin/account-info';
import EditVideo from '@/components/member/forms/edit-video';
import Heading from '@/components/admin/heading';
import MemberContainer from '@/components/member/member-container';
import { getCategories, getVideo } from '@/lib/member/prisma';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function NewVideoPage({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const currentSession = await getServerSession(authOptions);

  const categories = await getCategories();
  let video = null;
  if (currentSession?.user.id) {
    video = await getVideo(videoId, currentSession?.user.id);
  }
  console.log('video', video);

  return (
    <MemberContainer>
      <AdminAccountInfo />
      <div className="my-5"></div>
      <Heading>Edit video</Heading>
      {video ? (
        <EditVideo video={video} categories={categories} />
      ) : (
        <p>video not found</p>
      )}
    </MemberContainer>
  );
}
