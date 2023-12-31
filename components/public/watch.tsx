import { Category, User, Video } from '@prisma/client';
import React from 'react';
import { VideoPlayer } from './videoPlayer';

export default function Watch({
  video,
}: {
  video: Video & { user: User; category: Category };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl m-auto">
      <h1 className="font-bold text-2xl ">{video.title}</h1>
      <h6 className="text-right text-sm">
        <span className=" text-slate-600">Uploaded by</span>{' '}
        <b>
          {video.user.firstName} {video.user.lastName}
        </b>
      </h6>
      <VideoPlayer video={video.video} />
      <div>{video.description}</div>
    </div>
  );
}
