'use client';
import React from 'react';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Edit, Trash2 } from 'lucide-react';

import { Category, User, Video } from '@prisma/client';
import { apiDeleteVideo, apiGetVideos } from '@/lib/member/api/videos';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import TableSkeleton from '../admin/skeletons/table';
import route from '@/lib/routes';
import Pagination from '../admin/pagination';
import { PER_PAGE } from '@/lib/constants';

export default function MemberVideos({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const currentRaw = searchParams.get('page');
  const currentPage =
    currentRaw == null ? 1 : Math.max(parseInt(currentRaw), 1);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['videos', currentPage],
    queryFn: async () => {
      return await apiGetVideos({ currentPage });
    },
  });

  const mutation = useMutation({
    mutationFn: apiDeleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });

  return (
    <div>
      {query.isLoading && <TableSkeleton />}
      {query.isFetched && query.data.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Published</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.map(
                (video: Video & { category: Category; user: User }) => (
                  <tr key={video.id}>
                    <td>{video.title}</td>
                    <td>{video.category.name}</td>
                    <td>{video.published ? 'Yes' : 'No'}</td>
                    <td className="text-center">
                      <Link
                        className="inline"
                        href={route('member.videos.edit', {
                          videoId: video.id,
                        })}
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
            url={route('member.videos')}
            total={count}
            perpage={PER_PAGE}
            current={currentPage}
          />
        </>
      ) : (
        <div>{query?.data && query?.data.length == 0 && 'Nothing found'}</div>
      )}
    </div>
  );
}
