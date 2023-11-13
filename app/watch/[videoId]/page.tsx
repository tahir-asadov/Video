import Container from '@/components/public/container';
import Watch from '@/components/public/watch';
import { SITE_NAME } from '@/lib/constants';
import prisma from '@/lib/db';

export default async function WatchPage({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
    include: {
      category: true,
      user: true,
    },
  });
  return (
    <Container>
      {video ? (
        <>
          <Watch video={video} />
        </>
      ) : (
        <p>Nothing found!</p>
      )}
    </Container>
  );
}

export async function generateMetadata({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const video = await prisma.video.findUnique({
    select: {
      title: true,
    },
    where: {
      id: videoId,
    },
  });
  return {
    title: `${SITE_NAME} | ${video?.title}`,
  };
}
