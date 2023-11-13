import ButtonLink from '@/components/admin/button-link';
import Container from '@/components/admin/container';
import NewCategory from '@/components/admin/forms/new-category';
import route from '@/lib/routes';
// import QueryProvider from '@/providers/query-provider';
import React from 'react';

export default function NewCategoryPage() {
  return (
    <Container>
      <div className="flex gap-2 py-3 items-center">
        <ButtonLink
          key={route('admin.categories')}
          href={route('admin.categories')}
        >
          Categories
        </ButtonLink>
        <ButtonLink
          key={route('admin.categories.new')}
          active={true}
          href={route('admin.categories.new')}
        >
          New
        </ButtonLink>
      </div>
      {/* <QueryProvider> */}
      <NewCategory />
      {/* </QueryProvider> */}
    </Container>
  );
}
