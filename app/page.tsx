import Pagination from '@/components/admin/pagination';
import Container from '@/components/public/container';
import Videos from '@/components/public/videos';
import { PER_PAGE } from '@/lib/constants';
import prisma from '@/lib/db';
import route from '@/lib/routes';

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const term = searchParams?.term?.toString();
  const pageRaw = searchParams?.page?.toString();
  const currentPage = pageRaw == null || pageRaw == '0' ? 1 : parseInt(pageRaw);
  const skip = (currentPage - 1) * PER_PAGE!;
  const totalVideoCount = await prisma.video.aggregate({
    _count: {
      title: true,
    },
  });

  let count = 0;
  if (totalVideoCount) {
    count = totalVideoCount._count.title;
  }

  let dbSearchParams = {
    where: {
      published: {
        equals: true,
      },
      title: {},
    },
    include: {
      category: true,
      user: true,
    },
    skip,
    take: PER_PAGE,
  };
  if (term) {
    dbSearchParams = {
      ...dbSearchParams,
      where: {
        ...dbSearchParams.where,
        title: { startsWith: `%${term}%` },
      },
    };
  }

  const videos = await prisma.video.findMany(dbSearchParams);
  return (
    <Container>
      {videos ? (
        <>
          <Videos count={count} videos={videos} />
          <Pagination
            url={route('home')}
            total={count}
            perpage={PER_PAGE}
            current={currentPage}
          />
        </>
      ) : (
        <p>Nothing found!</p>
      )}
    </Container>
  );
}
