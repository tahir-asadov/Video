import route from "@/lib/routes";


export const signUp = async ({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) => {
  console.log(route('api.signup'));
  const res = await fetch(route('api.signup'), {
    method: 'POST',
    body: JSON.stringify({
      firstname, lastname, email, password
    })
  });
  return await res.json();
}
