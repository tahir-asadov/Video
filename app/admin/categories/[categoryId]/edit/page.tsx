import Container from '@/components/admin/container';
import EditCategory from '@/components/admin/forms/edit-category';
import { getCategories, getCategory } from '@/lib/admin/prisma';
// import QueryProvider from '@e/providers/query-provider';

export default async function CategoryEditPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const category = await getCategory(categoryId);

  return (
    <Container>
      {/* <QueryProvider> */}
      {category ? (
        <EditCategory category={category} />
      ) : (
        <p>Category not found</p>
      )}
      {/* </QueryProvider> */}
    </Container>
  );
}
