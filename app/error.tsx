'use client';
import React from 'react';

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-full h-full bg-red-600 text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-6xl my-3">Site crashed!</h1>
      <button
        className="border border-white rounded-md py-3 px-6 text-xl"
        onClick={() => reset()}
      >
        Reload
      </button>
    </div>
  );
}
