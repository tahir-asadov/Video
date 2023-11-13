import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Pagination({
  url,
  total,
  perpage,
  current,
}: {
  url: string;
  total: number;
  current: number;
  perpage: number;
}) {
  const pageCount = Math.floor(total / perpage);

  const pages = Array.from({ length: pageCount }, (v, k) => k + 1);
  const prevoius = current > 1 ? current - 1 : 0;
  const lastPage = pages.length;
  const prevoiusUrl = `${url}?page=${prevoius}`;
  const lastPageUrl = `${url}?page=${current + 1}`;
  return (
    <div className="flex flex-wrap gap-2 justify-center pt-5">
      {prevoius > 0 && (
        <Link
          className="border py-2 px-3 rounded-md"
          href={prevoiusUrl}
          key={prevoiusUrl}
        >
          <ArrowLeft className="w-4" />
        </Link>
      )}
      {pages.map((num) => {
        const pageUrl = `${url}?page=${num}`;
        return (
          <Link
            className={cn('border py-2 px-4 rounded-md', {
              'bg-red-300': num == current,
            })}
            href={pageUrl}
            key={num}
          >
            {num}
          </Link>
        );
      })}

      {current < lastPage && (
        <Link
          className="border py-2 px-3 rounded-md"
          href={lastPageUrl}
          key={lastPageUrl}
        >
          <ArrowRight className="w-4" />
        </Link>
      )}
    </div>
  );
}
