import route from '@/lib/routes';
import { Category, User, Video as VideoType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Video({
  video,
}: {
  video: VideoType & { user: User; category: Category };
}) {
  return (
    <div className=" border-b border-slate-400 border-dashed pb-5 ">
      <div>
        <Link
          href={`${route('watch', { videoId: video.id })}`}
          className="block mb-3 underline"
        >
          <h2 className="font-bold text-2xl ">{video.title}</h2>
        </Link>
        <h6 className="text-right pb-2 text-sm">
          <span className=" text-slate-600">Uploaded by</span>{' '}
          <b>
            {video.user.firstName} {video.user.lastName}
          </b>
        </h6>
      </div>
      <Link
        href={`${route('watch', { videoId: video.id })}`}
        className="block mb-3 underline"
      >
        <div className="relative w-full h-[500px]">
          <Image src={video.poster} alt="video" fill objectFit="contain" />
        </div>
      </Link>
    </div>
  );
}
