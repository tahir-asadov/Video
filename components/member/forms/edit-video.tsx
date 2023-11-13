'use client';
import { videoSchema } from '@/zod-schemas/video';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Video } from '@prisma/client';
import '@uploadthing/react/styles.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Button from '../button';
import Error from '../error';
import ImageUploader from '@/components/admin/image-uploader';
import { memberEditVideoSchema } from '@/zod-schemas/member-video';
import route from '@/lib/routes';
import { apiUpdateVideo } from '@/lib/member/api/videos';

export default function EditVideo({
  video,
  categories,
}: {
  video: Video;
  categories: Category[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiUpdateVideo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      router.push(route('member.videos'));
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(memberEditVideoSchema),
    defaultValues: {
      id: video.id,
      title: video.title,
      description: video.description,
      categoryId: video.categoryId,
      poster: video.poster,
    },
  });
  console.log('errors', errors);

  const onSubmit = handleSubmit((data: FieldValues) => {
    console.log('data', data);

    mutation.mutate({
      id: video.id,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      uploadDate: new Date(),
      poster: data.poster,
    });
  });
  return (
    <div>
      <form className="flex gap-2 flex-col max-w-xl m-auto" onSubmit={onSubmit}>
        <div className="flex gap-1 flex-col">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input placeholder="Title" type="text" {...register('title')} />
          {errors?.title?.message && (
            <Error message={errors?.title?.message.toString()} />
          )}
        </div>

        <div className="flex gap-1 flex-col">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <textarea placeholder="Description" {...register('description')} />
          {errors?.description?.message && (
            <Error message={errors?.description?.message.toString()} />
          )}
        </div>

        <div className="flex gap-1 flex-col">
          <label htmlFor="description" className="font-bold">
            Category
          </label>
          <select {...register('categoryId')}>
            <option value="">Select category</option>
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors?.categoryId?.message && (
            <Error message={errors?.categoryId?.message.toString()} />
          )}
        </div>

        <Controller
          control={control}
          name="poster"
          render={({ field }) => (
            <ImageUploader value={field.value} onChange={field.onChange} />
          )}
        />
        {errors?.poster?.message && (
          <Error message={errors?.poster?.message.toString()} />
        )}

        <div className="flex gap-2 flex-col justify-center items-start">
          <Button active={true}>Update</Button>
        </div>
      </form>
    </div>
  );
}
