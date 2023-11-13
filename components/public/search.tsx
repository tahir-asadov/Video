'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [term, setTerm] = useState('');
  const params = new URLSearchParams(searchParams);
  const termParam = params.get('term');
  const defaultTerm = termParam != null ? termParam.toString() : '';
  useEffect(() => {
    if (defaultTerm !== '') {
      setTerm(defaultTerm);
    }
  }, []);
  //
  const search = () => {
    params.set('term', term);
    router.push(`/?${params.toString()}`);
  };
  return (
    <div className="flex justify-center p-2 flex-grow relative max-w-2xl">
      <input
        type="text"
        onChange={(e) => {
          setTerm(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key == 'Enter') {
            search();
          }
        }}
        value={term}
        className="w-full border rounded-md !p-1"
      />
      <button className="absolute top-0 bottom-0 rounded-md right-2.5 m-auto bg-slate-100 h-8 w-8 flex justify-center items-center cursor-pointer group ">
        <SearchIcon
          onClick={search}
          className="h-5 text-slate-300 group-hover:text-slate-500 transition duration-300"
        />
      </button>
    </div>
  );
}
