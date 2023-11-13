'use client';

import {} from '@/zod-schemas/video';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { apiAddVideo } from '@/lib/member/api/videos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import route from '@/lib/routes';
import { useRouter } from 'next/navigation';
import '@uploadthing/react/styles.css';
import { Category, User } from '@prisma/client';
import ImageUploader from '@/components/admin/image-uploader';
import VideoUploader from '@/components/admin/video-uploader';
import Error from '@/components/member/error';
import Button from '@/components/member/button';
import { memberVideoSchema } from '@/zod-schemas/member-video';
export default function NewVideo({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiAddVideo,
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
  } = useForm({ resolver: zodResolver(memberVideoSchema) });

  const onSubmit = handleSubmit((data: FieldValues) => {
    mutation.mutate({
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      video: data.video,
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
        <Controller
          control={control}
          name="video"
          render={({ field }) => (
            <VideoUploader value={field.value} onChange={field.onChange} />
          )}
        />
        {errors?.video?.message && (
          <Error message={errors?.video?.message.toString()} />
        )}

        <div className="flex gap-2 flex-col justify-center items-start">
          <Button active={true}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
