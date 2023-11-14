'use client';
import { apiDeleteVideo, apiGetVideos } from '@/lib/admin/api/videos';
import route from '@/lib/routes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Divide, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import TableSkeleton from './skeletons/table';
import Pagination from './pagination';
import { useSearchParams } from 'next/navigation';
import { PER_PAGE } from '@/lib/constants';
import { Category, User, Video } from '@prisma/client';
import { NotificationContext } from '@/providers/notification-provider';
import { useContext } from 'react';
export default function Videos({ count }: { count: number }) {
  const { flash } = useContext(NotificationContext);
  const searchParams = useSearchParams();
  const currentRaw = searchParams.get('page');
  const currentPage =
    currentRaw == null ? 1 : Math.max(parseInt(currentRaw), 1);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['videos', currentPage],
    queryFn: async () => {
      return await apiGetVideos(currentPage);
    },
  });
  const mutation = useMutation({
    mutationFn: apiDeleteVideo,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      flash({ message: data['message'], status: 'success' });
    },
    onError: (error) => {
      flash({ message: error.message, status: 'error' });
    },
  });
  console.log('data', query.data);

  return (
    <div>
      {query.isLoading && <TableSkeleton />}

      {query.isFetched && query.data && query.data.videos.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Published</th>
                <th>User</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.videos.map(
                (video: Video & { category: Category; user: User }) => (
                  <tr key={video.id}>
                    <td>{video.title}</td>
                    <td>{video.category.name}</td>
                    <td>{video.published ? 'Yes' : 'No'}</td>
                    <td>
                      {video.user.firstName} {video.user.lastName}
                    </td>
                    <td className="text-center">
                      <Link
                        className="inline"
                        href={route('admin.videos.edit', { videoId: video.id })}
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </td>
                    <td className="text-center">
                      <button>
                        <Trash2
                          className="w-4"
                          onClick={() => {
                            if (confirm('Are you sure to delete this video?')) {
                              mutation.mutate(video.id);
                            }
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <Pagination
            url={route('admin.videos')}
            total={count}
            perpage={PER_PAGE}
            current={currentPage}
          />
        </>
      ) : (
        !query.isLoading && <div>Nothing found</div>
      )}
    </div>
  );
}
