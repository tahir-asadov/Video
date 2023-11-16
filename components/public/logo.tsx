import route from '@/lib/routes';
import Link from 'next/link';

export default function Logo() {
  return (
    <div>
      <Link
        className="text-center md:text-left text-3xl italic p-2 block"
        href={route('home')}
      >
        VIEWTUBE
      </Link>
    </div>
  );
}
