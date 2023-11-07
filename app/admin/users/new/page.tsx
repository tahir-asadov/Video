import ButtonLink from '@/components/admin/button-link';
import Container from '@/components/admin/container';
import NewUser from '@/components/admin/forms/new-user';
import route from '@/lib/routes';
// import QueryProvider from '@/providers/query-provider';
import React from 'react';

export default function NewUserPage() {
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
      <NewUser />
      {/* </QueryProvider> */}
    </Container>
  );
}
