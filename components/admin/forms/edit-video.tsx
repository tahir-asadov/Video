'use client';

import { videoSchema } from '@/zod-schemas/video';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Error from '../error';
import Button from '../button';
import { apiUpdateVideo } from '@/lib/admin/api/videos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import route from '@/lib/routes';
import { useRouter } from 'next/navigation';
import '@uploadthing/react/styles.css';
import { Category, User, Video } from '@prisma/client';
import ImageUploader from '../image-uploader';
import VideoUploader from '../video-uploader';
export default function EditVideo({
  video,
  categories,
  users,
}: {
  video: Video;
  categories: Category[];
  users: User[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiUpdateVideo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      // router.push(route('admin.videos'));
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      id: video.id,
      title: video.title,
      description: video.description,
      categoryId: video.categoryId,
      userId: video.userId,
      video: video.video,
      poster: video.poster,
    },
  });

  const onSubmit = handleSubmit((data: FieldValues) => {
    console.log('data', data);

    mutation.mutate({
      id: video.id,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      userId: data.userId,
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

        <div className="flex gap-2">
          <div className="flex gap-1 flex-col w-1/2">
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

          <div className="flex gap-1 flex-col w-1/2">
            <label htmlFor="description" className="font-bold">
              User
            </label>
            <select {...register('userId')}>
              <option value="">Select user</option>
              {users?.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {errors?.userId?.message && (
              <Error message={errors?.userId?.message.toString()} />
            )}
          </div>
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
          <Button active={true}>Update</Button>
        </div>
      </form>
    </div>
  );
}