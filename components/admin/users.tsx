'use client';

import route from '@/lib/routes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import TableSkeleton from './skeletons/table';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from './pagination';
import { PER_PAGE } from '@/lib/constants';
import { apiDeleteUser, apiGetUsers } from '@/lib/admin/api/users';
import { User } from '@prisma/client';
import { useContext } from 'react';
import { NotificationContext } from '@/providers/notification-provider';

export default function Users({ count }: { count: number }) {
  const { flash } = useContext(NotificationContext);
  const searchParams = useSearchParams();
  const currentRaw = searchParams.get('page');
  const currentPage =
    currentRaw == null ? 1 : Math.max(parseInt(currentRaw), 1);

  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiDeleteUser,
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
  const query = useQuery({
    queryKey: ['users', currentPage],
    queryFn: async () => {
      return await apiGetUsers(currentPage);
    },
  });
  return (
    <div>
      {query.isLoading && <TableSkeleton />}
      {query.isFetched && query.data?.users.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Email verified</th>
                <th>Active</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {query.data?.users.map((user: User) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.emailVerified?.toString()}</td>
                  <td>{user.active ? 'Active' : 'Deactive'}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      href={route('admin.users.edit', {
                        userId: user.id,
                      })}
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure to delete this user?')) {
                          mutation.mutate(user.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            url={route('admin.users')}
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
