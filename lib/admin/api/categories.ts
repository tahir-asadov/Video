import route from "@/lib/routes";
import { Category } from "@prisma/client";

export const apiGetCategories = async (currentPage: number) => {
  const res = await fetch(route('api.admin.categories', { 'currentPage': currentPage.toString() })).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res
}

export const apiAddCategory = async ({ name, slug, description }: Omit<Category, "id">) => {
  console.log(route('api.admin.category'));
  const res = await fetch(route('api.admin.category'), {
    method: 'POST',
    body: JSON.stringify({
      name, slug, description
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res;
}

export const apiUpdateCategory = async ({ id, name, slug, description }: Category) => {
  console.log(route('api.admin.category'));
  const res = await fetch(route('api.admin.category'), {
    method: 'PATCH',
    body: JSON.stringify({
      id, name, slug, description
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res;
}


export const apiDeleteCategory = async (id: string) => {
  console.log(route('api.admin.category'));
  const res = await fetch(route('api.admin.category'), {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message)
    }
  });
  return await res;
}

