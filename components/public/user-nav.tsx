import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import route from '@/lib/routes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function UserNav() {
  const userInfo = await getServerSession(authOptions);

  return (
    <div className="flex items-center p-2">
      <div className="flex gap-3 ">
        {userInfo?.user.role == 'ADMIN' && (
          <Link href={route('admin')}>Admin</Link>
        )}
        {(userInfo?.user.role == 'MEMBER' ||
          userInfo?.user.role == 'ADMIN') && (
          <Link href={route('member.account')}>Dashboard</Link>
        )}
        {userInfo?.user ? (
          <>
            <Link href={route('signout')}>Logout</Link>
          </>
        ) : (
          <>
            <Link href={route('signin')}>Sign In</Link>
            <Link href={route('signup')}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}
