import Button from '@/components/admin/button';
import ButtonLink from '@/components/admin/button-link';
import Container from '@/components/admin/container';
import Heading from '@/components/admin/heading';
import Users from '@/components/admin/users';
import prisma from '@/lib/db';
import route from '@/lib/routes';
// import QueryProvider from '@/providers/query-provider';

export default async function UsersPage() {
  const totalUserCount = await prisma.user.aggregate({
    _count: {
      email: true,
    },
  });

  let count = 0;
  if (totalUserCount) {
    count = totalUserCount._count.email;
  }
  return (
    <Container>
      <Heading>Users</Heading>
      <div className="flex gap-2 py-3 items-center">
        <ButtonLink
          key={route('admin.users')}
          active={true}
          className=""
          href={route('admin.users')}
        >
          Users
        </ButtonLink>
        <ButtonLink
          key={route('admin.users.new')}
          href={route('admin.users.new')}
        >
          New
        </ButtonLink>
      </div>
      {/* <QueryProvider> */}
      <Users count={count} />
      {/* </QueryProvider> */}
    </Container>
  );
}
