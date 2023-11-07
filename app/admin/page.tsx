import AdminAccountInfo from '@/components/admin/account-info';
import Container from '@/components/admin/container';
import Heading from '@/components/admin/heading';

export default async function AdminPage() {
  return (
    <Container>
      <AdminAccountInfo />
      <div className="my-5"></div>
      <Heading>Admin dashboard</Heading>
    </Container>
  );
}
