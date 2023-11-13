import route from '@/lib/routes';
import { Video as VideoType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Video({ video }: { video: VideoType }) {
  return (
    <div className=" border-b border-slate-400 border-dashed pb-5 underline">
      <div>
        <Link
          href={`${route('watch', { videoId: video.id })}`}
          className="block mb-3 "
        >
          <h2 className="font-bold text-2xl ">{video.title}</h2>
        </Link>
      </div>
      <div className="relative w-full h-[500px]">
        <Image src={video.poster} alt="video" fill objectFit="contain" />
      </div>
    </div>
  );
}
