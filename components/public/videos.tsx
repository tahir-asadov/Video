import { Category, User, Video as VideoType } from '@prisma/client';
import React from 'react';
import Video from './video';

type VideosProp = VideoType & { user: User; category: Category };

export default function Videos({
  videos,
  count,
}: {
  videos: VideosProp[];
  count: number;
}) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl m-auto">
      {videos.map((video, index) => {
        return <Video key={index} video={video} />;
      })}
    </div>
  );
}
