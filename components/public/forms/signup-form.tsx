'use client';

import Error from '@/components/admin/error';
import { signUp } from '@/lib/public/api/user';
import route from '@/lib/routes';
import { signupClientSchema } from '@/zod-schemas/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';

export default function SignUpForm() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // router.push(route('signin'));
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupClientSchema) });
  // firstname, lastname, email, password

  const onSubmit = handleSubmit((data: FieldValues) => {
    console.log(data);
    mutation.mutate({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
  });

  return (
    <div>
      <h1 className="w-full text-center font-bold text-2xl py-4 text-slate-600">
        Sign up
      </h1>
      <form
        className="flex gap-2 flex-col rounded border shadow-md p-6 w-80"
        onSubmit={onSubmit}
      >
        <div>
          <label>First name</label>
          <input type="text" {...register('firstname')} />
          {errors?.firstname?.message && (
            <Error message={errors?.firstname?.message.toString()} />
          )}
        </div>
        <div>
          <label>Last name</label>
          <input type="text" {...register('lastname')} />
          {errors?.lastname?.message && (
            <Error message={errors?.lastname?.message.toString()} />
          )}
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors?.email?.message && (
            <Error message={errors?.email?.message.toString()} />
          )}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors?.password?.message && (
            <Error message={errors?.password?.message.toString()} />
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors?.confirmPassword?.message && (
            <Error message={errors?.confirmPassword?.message.toString()} />
          )}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
