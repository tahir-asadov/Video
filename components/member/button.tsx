import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export default function Button({
  active,
  className,
  children,
}: {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      className={cn('border py-1 px-4 rounded-md', className, {
        'border-sky-700 bg-sky-500 text-white': active,
      })}
    >
      {children}
    </button>
  );
}
