import route from "@/lib/routes";


export const signUp = async ({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) => {
  console.log(route('api.signup'));
  const res = await fetch(route('api.signup'), {
    method: 'POST',
    body: JSON.stringify({
      firstname, lastname, email, password
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
