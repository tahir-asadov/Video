import { UploadButton, UploadDropzone } from '@/src/utils/uploadthing';
import React from 'react';

export default function ImageUploader({
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
          <img className="block rounded-md mb-2" src={value} alt="video" />
        </div>
      )}
      <UploadDropzone
        endpoint="imageUploader"
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
