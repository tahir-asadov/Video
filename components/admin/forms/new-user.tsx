'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Error from '../error';
import Button from '../button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import route from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { apiAddUser } from '@/lib/admin/api/users';
import { userSchema } from '@/zod-schemas/user';
import { Role } from '@prisma/client';
import { z } from 'zod';
import { useContext } from 'react';
import { NotificationContext } from '@/providers/notification-provider';

export default function NewUser() {
  const { flash } = useContext(NotificationContext);
  // type User = z.infer<typeof userSchema>;

  type userSchemaType = z.infer<typeof userSchema>;
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiAddUser,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      router.push(route('admin.users'));
      flash({ message: data['message'], status: 'success' });
    },
    onError: (error) => {
      flash({ message: error.message, status: 'error' });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userSchemaType>({ resolver: zodResolver(userSchema) });

  const onSubmit = handleSubmit((data: userSchemaType) => {
    mutation.mutate({
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
            {...register('active', { setValueAs: (value) => value == '1' })}
          >
            <option value="0">Deactive</option>
            <option value="1">Active</option>
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
