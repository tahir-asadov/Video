import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminAccountInfo from '@/components/admin/account-info';
import Heading from '@/components/admin/heading';
import ButtonLink from '@/components/member/button-link';
import MemberContainer from '@/components/member/member-container';
import MemberVideos from '@/components/member/videos';
import prisma from '@/lib/db';
import route from '@/lib/routes';
import { getServerSession } from 'next-auth';

export default async function MemberVideosPage() {
  const currentSession = await getServerSession(authOptions);

  let count = 0;
  if (currentSession?.user.id) {
    const totalVideoCount = await prisma.video.aggregate({
      _count: {
        title: true,
      },
    });
    if (totalVideoCount) {
      count = totalVideoCount._count.title;
    }
  }
  return (
    <MemberContainer>
      <AdminAccountInfo />
      <div className="my-5"></div>
      <Heading>Videos</Heading>

      <div className="flex gap-2 py-3 items-center">
        <ButtonLink
          key={route('member.videos')}
          active={true}
          className=""
          href={route('member.videos')}
        >
          Videos
        </ButtonLink>
        <ButtonLink
          key={route('member.videos.new')}
          href={route('member.videos.new')}
        >
          New
        </ButtonLink>
      </div>
      <MemberVideos count={count} />
    </MemberContainer>
  );
}
