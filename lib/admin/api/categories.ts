import route from "@/lib/routes";
import { Category } from "@prisma/client";

export const apiGetCategories = async (currentPage: number) => {
  return await fetch(route('api.admin.categories', { currentPage: currentPage.toString() })).then(res => res.json()).then(data => data.categories);
}

export const apiAddCategory = async ({ name, slug, description }: Omit<Category, "id">) => {
  console.log(route('api.admin.category'));
  const res = await fetch(route('api.admin.category'), {
    method: 'POST',
    body: JSON.stringify({
      name, slug, description
    })
  });
  return await res.json();
}

export const apiUpdateCategory = async ({ id, name, slug, description }: Category) => {
  console.log(route('api.admin.category'));
  const res = await fetch(route('api.admin.category'), {
    method: 'PATCH',
    body: JSON.stringify({
      id, name, slug, description
    })
  });
  return await res.json();
}


export const apiDeleteCategory = async (id: string) => {
  console.log(route('api.admin.category'));
  const res = await fetch(route('api.admin.category'), {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  });
  return await res.json();
}

