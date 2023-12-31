import AdminAccountInfo from '@/components/admin/account-info';
import Heading from '@/components/admin/heading';
import MemberContainer from '@/components/member/member-container';

export default async function Member() {
  return (
    <MemberContainer>
      <AdminAccountInfo />
      <div className="my-5"></div>
      <Heading>Member dashboard</Heading>
    </MemberContainer>
  );
}
