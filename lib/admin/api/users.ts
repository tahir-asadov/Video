import route from "@/lib/routes";
import { User } from "@prisma/client";

export const apiGetUsers = async (currentPage: number) => {
  return await fetch(route('api.admin.users', { currentPage: currentPage.toString() })).then(res => res.json()).then(data => data.users);
}


export const apiAddUser = async ({ firstName, lastName, email, active, role, password }: Omit<User, "id" | "emailVerified" | "image" | "videos" | "verifyToken">) => {
  console.log(route('api.admin.user'));
  const res = await fetch(route('api.admin.user'), {
    method: 'POST',
    body: JSON.stringify({
      firstName, lastName, email, active, role, password
    })
  });
  return await res.json();
}

export const apiUpdateUser = async ({ id, firstName, lastName, email, role, password, active }: { password?: string } & Omit<User, "emailVerified" | "image" | "videos" | "verifyToken" | "password">) => {
  console.log(route('api.admin.user'));
  const res = await fetch(route('api.admin.user'), {
    method: 'PATCH',
    body: JSON.stringify({
      id, firstName, lastName, email, role, password, active
    })
  });
  return await res.json();
}


export const apiDeleteUser = async (id: string) => {
  console.log(route('api.admin.user'));
  const res = await fetch(route('api.admin.user'), {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  });
  return await res.json();
}

