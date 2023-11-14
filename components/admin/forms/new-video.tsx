'use client';

import { videoSchema } from '@/zod-schemas/video';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Error from '../error';
import Button from '../button';
import { apiAddVideo } from '@/lib/admin/api/videos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import route from '@/lib/routes';
import { useRouter } from 'next/navigation';
import '@uploadthing/react/styles.css';
import ImageUploader from '../image-uploader';
import VideoUploader from '../video-uploader';
import { Category, User } from '@prisma/client';
import { useContext } from 'react';
import { NotificationContext } from '@/providers/notification-provider';
export default function NewVideo({
  categories,
  users,
}: {
  categories: Category[];
  users: User[];
}) {
  const { flash } = useContext(NotificationContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiAddVideo,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      router.push(route('admin.videos'));
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
  } = useForm({ resolver: zodResolver(videoSchema) });

  const onSubmit = handleSubmit((data: FieldValues) => {
    mutation.mutate({
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      userId: data.userId,
      video: data.video,
      poster: data.poster,
      published: data.published,
    });
  });

  const statuses = [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ];
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
            Is published
          </label>
          <select
            {...register('published', {
              setValueAs: (value) => {
                return value == 'true';
              },
            })}
          >
            <option value="">Is published</option>
            {statuses.map((status) => (
              <option
                value={status.value ? 'true' : 'false'}
                key={status.label}
              >
                {status.label}
              </option>
            ))}
          </select>
          {errors?.published?.message && (
            <Error message={errors?.published?.message.toString()} />
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
          <Button active={true}>Submit</Button>
        </div>
        {/* <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log('Files: ', res);
              alert('Upload Completed');
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div> */}
      </form>
    </div>
  );
}
