'use client';

import { memberLinks } from '@/data/admin/member-links';
import { siteURL } from '@/lib/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MemberNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-3 py-2">
      {memberLinks.map((link) => {
        const urlPath = link.url.replace(siteURL, '');
        return (
          <Link
            key={link.url}
            className={cn('font-bold opacity-30', {
              'opacity-100': pathname.startsWith(urlPath),
            })}
            href={link.url}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
