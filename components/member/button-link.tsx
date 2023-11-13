import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Button from './button';

export default function ButtonLink({
  active,
  children,
  href,
  className,
}: {
  active?: boolean;
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link href={href}>
      <Button
        active={active}
        className={cn('border py-1 px-4 rounded-md', className)}
      >
        {children}
      </Button>
    </Link>
  );
}
