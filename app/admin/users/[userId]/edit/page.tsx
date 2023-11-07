import ButtonLink from '@/components/admin/button-link';
import Container from '@/components/admin/container';
import EditUser from '@/components/admin/forms/edit-user';
import NewUser from '@/components/admin/forms/new-user';
import prisma from '@/lib/db';
import route from '@/lib/routes';
// import QueryProvider from '@/providers/query-provider';
import React from 'react';

export default async function EditUserPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  console.log('server', user);

  return (
    <Container>
      <div className="flex gap-2 py-3 items-center">
        <ButtonLink key={route('admin.users')} href={route('admin.users')}>
          Users
        </ButtonLink>
        <ButtonLink
          key={route('admin.users.new')}
          active={true}
          href={route('admin.users.new')}
        >
          New
        </ButtonLink>
      </div>
      {/* <QueryProvider> */}
      {user ? <EditUser user={user} /> : <p>User not found</p>}
      {/* </QueryProvider> */}
    </Container>
  );
}
