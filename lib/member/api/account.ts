import route from "@/lib/routes";

export const apiUpdateAccount = async ({ firstName, lastName, password }: { firstName: string, lastName: string, password?: string }) => {
  console.log(route('api.member.account'));
  const res = await fetch(route('api.member.account'), {
    method: 'PATCH',
    body: JSON.stringify({
      firstName, lastName, password
    })
  });
  return await res.json();
}
