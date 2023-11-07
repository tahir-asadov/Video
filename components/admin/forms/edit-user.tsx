'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Error from '../error';
import Button from '../button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import route from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { apiAddUser, apiUpdateUser } from '@/lib/admin/api/users';
import { userEditSchema } from '@/zod-schemas/user';
import { Role, User } from '@prisma/client';
import { z } from 'zod';
import { userStatus } from '@/lib/constants';

export default function EditUser({ user }: { user: User }) {
  console.log('user', user);

  type userSchemaType = z.infer<typeof userEditSchema>;
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiUpdateUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users', user] });
      router.push(route('admin.users'));
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userSchemaType>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      active: user.active,
      email: user.email,
      role: user.role,
      password: '',
    },
  });

  const onSubmit = handleSubmit((data: userSchemaType) => {
    mutation.mutate({
      id: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      active: data.active,
      role: data.role,
      password: data.password,
    });
  });
  return (
    <div>
      <form className="flex gap-2 flex-col max-w-xl m-auto" onSubmit={onSubmit}>
        <div>
          <label className="font-bold">First name</label>
          <input
            placeholder="First name"
            type="text"
            {...register('firstName')}
          />
          {errors?.firstName?.message && (
            <Error message={errors?.firstName?.message.toString()} />
          )}
        </div>
        <div>
          <label className="font-bold">Last name</label>
          <input
            placeholder="Last name"
            type="text"
            {...register('lastName')}
          />
          {errors?.lastName?.message && (
            <Error message={errors?.lastName?.message.toString()} />
          )}
        </div>
        <div>
          <label className="font-bold">Email</label>
          <input placeholder="Email" type="email" {...register('email')} />
          {errors?.email?.message && (
            <Error message={errors?.email?.message.toString()} />
          )}
        </div>
        <div>
          <label className="font-bold">Password</label>
          <input
            placeholder="Password"
            type="password"
            {...register('password')}
          />
          {errors?.password?.message && (
            <Error message={errors?.password?.message.toString()} />
          )}
        </div>
        <div>
          <label htmlFor="role" className="font-bold">
            Role
          </label>
          <select {...register('role')}>
            {Object.keys(Role).map((role) => {
              return (
                <option value={role} key={role}>
                  {role}
                </option>
              );
            })}
          </select>
          {errors?.role?.message && (
            <Error message={errors?.role?.message.toString()} />
          )}
        </div>
        <div>
          <label htmlFor="active" className="font-bold">
            Active
          </label>
          <select
            {...register('active', {
              setValueAs: (value) => {
                return value == 'true';
              },
            })}
          >
            {Object.values(userStatus).map((status, index) => {
              return (
                <option key={index} value={Object.keys(userStatus).at(index)}>
                  {status}
                </option>
              );
            })}
          </select>
          {errors?.active?.message && (
            <Error message={errors?.active?.message.toString()} />
          )}
        </div>

        <div className="flex gap-2 flex-col justify-center items-start">
          <Button active={true}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
