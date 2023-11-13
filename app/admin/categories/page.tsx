import ButtonLink from '@/components/admin/button-link';
import Categories from '@/components/admin/categories';
import Container from '@/components/admin/container';
import Heading from '@/components/admin/heading';
import prisma from '@/lib/db';
import route from '@/lib/routes';
// import QueryProvider from '@/providers/query-provider';

export default async function CategoriesPage() {
  const totalCategoryCount = await prisma.category.aggregate({
    _count: {
      name: true,
    },
  });
  let count = 0;
  if (totalCategoryCount) {
    count = totalCategoryCount._count.name;
  }
  return (
    <Container>
      <Heading>Categories</Heading>
      <div className="flex gap-2 py-3 items-center">
        <ButtonLink
          key={route('admin.categories')}
          active={true}
          href={route('admin.categories')}
        >
          Categories
        </ButtonLink>
        <ButtonLink
          key={route('admin.categories.new')}
          href={route('admin.categories.new')}
        >
          New
        </ButtonLink>
      </div>
      {/* <QueryProvider> */}
      <Categories count={count} />
      {/* </QueryProvider> */}
    </Container>
  );
}
