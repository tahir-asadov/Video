import ButtonLink from '@/components/admin/button-link';
import Container from '@/components/admin/container';
import Heading from '@/components/admin/heading';
import Videos from '@/components/admin/videos';
import prisma from '@/lib/db';
import route from '@/lib/routes';
// import QueryProvider from '@/providers/query-provider';

export default async function VideosPage() {
  const totalVideoCount = await prisma.video.aggregate({
    _count: {
      title: true,
    },
  });

  let count = 0;
  if (totalVideoCount) {
    count = totalVideoCount._count.title;
  }

  return (
    <Container>
      <Heading>Videos</Heading>
      <div className="flex gap-2 py-3 items-center">
        <ButtonLink
          key={route('admin.videos')}
          active={true}
          className=""
          href={route('admin.videos')}
        >
          Videos
        </ButtonLink>
        <ButtonLink
          key={route('admin.videos.new')}
          href={route('admin.videos.new')}
        >
          New
        </ButtonLink>
      </div>
      {/* <QueryProvider> */}
      <Videos count={count} />
      {/* </QueryProvider> */}
    </Container>
  );
}
