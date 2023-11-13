import AdminAccountInfo from '@/components/admin/account-info';
import Heading from '@/components/admin/heading';
import NewVideo from '@/components/member/forms/new-video';
import MemberContainer from '@/components/member/member-container';
import { getCategories } from '@/lib/member/prisma';
import React from 'react';

export default async function NewVideoPage() {
  const categories = await getCategories();
  return (
    <MemberContainer>
      <AdminAccountInfo />
      <div className="my-5"></div>
      <Heading>Add new video</Heading>
      <NewVideo categories={categories} />
    </MemberContainer>
  );
}
