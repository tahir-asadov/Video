import ButtonLink from '@/components/admin/button-link';
import Container from '@/components/admin/container';
import NewVideo from '@/components/admin/forms/new-video';
import Heading from '@/components/admin/heading';
import { getCategories, getUsers } from '@/lib/admin/prisma';
import route from '@/lib/routes';
// import QueryProvider from '@/providers/query-provider';

export default async function VideosPage() {
  const categories = await getCategories();
  const users = await getUsers();

  return (
    <Container>
      <Heading>Add new video</Heading>
      <div className="flex gap-2 py-3 items-center">
        <ButtonLink
          key={route('admin.videos')}
          className=""
          href={route('admin.videos')}
        >
          Videos
        </ButtonLink>
        <ButtonLink
          active={true}
          key={route('admin.videos.new')}
          href={route('admin.videos.new')}
        >
          New
        </ButtonLink>
      </div>
      {/* <QueryProvider> */}
      <NewVideo categories={categories} users={users} />
      {/* </QueryProvider> */}
    </Container>
  );
}
