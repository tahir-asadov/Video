'use client';
import Button from '@/components/member/button';
import Error from '@/components/member/error';
import { apiUpdateAccount } from '@/lib/member/api/account';
import route from '@/lib/routes';
import { NotificationContext } from '@/providers/notification-provider';
import { memberAccountClientSchema } from '@/zod-schemas/member-account';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AccountForm({ user }: { user: User }) {
  const { flash } = useContext(NotificationContext);
  type memberAccountSchemaType = z.infer<typeof memberAccountClientSchema>;
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiUpdateAccount,
    onSuccess: (data) => {
      // Invalidate and refetch
      // router.push(route('member'));
      if (data && data['success']) {
        flash({ message: data['message'], status: 'success' });
        setTimeout(() => {
          router.push(route('member'));
        }, 1200);
      } else {
        flash({ message: data['message'], status: 'error' });
      }
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<memberAccountSchemaType>({
    resolver: zodResolver(memberAccountClientSchema),
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = handleSubmit((data: memberAccountSchemaType) => {
    mutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      password: data?.password,
    });
  });
  return (
    <div>
      <form className="flex gap-2 flex-col max-w-xl m-auto" onSubmit={onSubmit}>
        <label className="font-bold">First name</label>
        <input type="text" {...register('firstName')} />
        {errors?.firstName?.message && (
          <Error message={errors?.firstName?.message.toString()} />
        )}
        <label className="font-bold">Last name</label>
        <input type="text" {...register('lastName')} />
        {errors?.lastName?.message && (
          <Error message={errors?.lastName?.message.toString()} />
        )}
        <label className="font-bold">Password</label>
        <input type="password" {...register('password')} />
        <label className="font-bold">Confirm Password</label>
        <input type="password" {...register('confirmPassword')} />
        {errors?.confirmPassword?.message && (
          <Error message={errors?.confirmPassword?.message.toString()} />
        )}
        <Button active={true}>
          {mutation.isPending ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
