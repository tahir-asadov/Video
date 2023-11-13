import { currentUser, getUserVideoCount } from '@/lib/common';
export default async function AdminAccountInfo() {
  const { user, role } = await currentUser();
  const videoCount = user ? await getUserVideoCount(user?.id) : 0;

  return (
    <div className="flex gap-4 p-2 bg-zinc-300/20 items-center rounded-md">
      <div>
        <div>
          <b>Name:</b> {user?.firstName} {user?.lastName}
        </div>
        <div>
          <b>E-mail:</b> {user?.email}
        </div>
        {role == 'ADMIN' && (
          <div>
            <b>Role:</b> ADMIN
          </div>
        )}
        <div>
          <b>Video:</b> {videoCount}
        </div>
      </div>
    </div>
  );
}
