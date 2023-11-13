import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminAccountInfo from '@/components/admin/account-info';
import Heading from '@/components/admin/heading';
import AccountForm from '@/components/member/forms/account-form';
import MemberContainer from '@/components/member/member-container';
import { getCurrentUser } from '@/lib/common';
import { getServerSession } from 'next-auth';

export default async function MemberAccount() {
  const currentUser = await getCurrentUser();

  return (
    <MemberContainer>
      <AdminAccountInfo />
      <div className="my-5"></div>
      <Heading>Account</Heading>
      {currentUser ? (
        <AccountForm user={currentUser} />
      ) : (
        <p>Account info not found</p>
      )}
    </MemberContainer>
  );
}
