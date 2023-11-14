import { UploadButton, UploadDropzone } from '@/src/utils/uploadthing';
import React from 'react';

export default function VideoUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url?: string) => void;
}) {

  return (
    <>
      {value && (
        <div className="relative">
          <video controls src={value} className="block rounded-md mb-2"></video>
        </div>
      )}
      <UploadDropzone
        endpoint="videoUploader"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.info(error);
        }}
      />
    </>
  );
}
