'use client';

import {
  apiDeleteCategory,
  apiGetCategories,
} from '@/lib/admin/api/categories';
import route from '@/lib/routes';
import { Category } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import TableSkeleton from './skeletons/table';
import { useSearchParams } from 'next/navigation';
import Pagination from './pagination';
import { PER_PAGE } from '@/lib/constants';

export default function Categories({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const currentRaw = searchParams.get('page');
  const currentPage =
    currentRaw == null ? 1 : Math.max(parseInt(currentRaw), 1);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiDeleteCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  const query = useQuery({
    queryKey: ['categories', currentPage],
    queryFn: async () => {
      return await apiGetCategories(currentPage);
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
                <th>Name</th>
                <th>Slug</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.map((category: Category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>
                    <Link
                      href={route('admin.categories.edit', {
                        categoryId: category.id,
                      })}
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                  <td>
                    <button>
                      <Trash2
                        className="w-4"
                        onClick={() => {
                          if (
                            confirm('Are you sure to delete this category?')
                          ) {
                            mutation.mutate(category.id);
                          }
                        }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            url={route('admin.categories')}
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
