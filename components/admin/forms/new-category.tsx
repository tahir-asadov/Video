'use client';

import { categorySchema } from '@/zod-schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Error from '../error';
import Button from '../button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import route from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { apiAddCategory } from '@/lib/admin/api/categories';
import { useContext } from 'react';
import { NotificationContext } from '@/providers/notification-provider';

export default function NewCategory() {
  const { flash } = useContext(NotificationContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiAddCategory,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      router.push(route('admin.categories'));
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
  } = useForm({ resolver: zodResolver(categorySchema) });

  const onSubmit = handleSubmit((data: FieldValues) => {
    mutation.mutate({
      name: data.name,
      slug: data.slug,
      description: data.description,
    });
  });
  return (
    <div>
      <form className="flex gap-2 flex-col max-w-xl m-auto" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input placeholder="Name" type="text" {...register('name')} />
          {errors?.name?.message && (
            <Error message={errors?.name?.message.toString()} />
          )}
        </div>
        <div>
          <label htmlFor="slug" className="font-bold">
            Slug
          </label>
          <input placeholder="Slug" type="text" {...register('slug')} />
          {errors?.slug?.message && (
            <Error message={errors?.slug?.message.toString()} />
          )}
        </div>
        <div>
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <textarea placeholder="Description" {...register('description')} />
          {errors?.description?.message && (
            <Error message={errors?.description?.message.toString()} />
          )}
        </div>

        <div className="flex gap-2 flex-col justify-center items-start">
          <Button active={true}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
