import { SearchIcon, SearchX } from 'lucide-react';

export default function Search() {
  return (
    <div className="flex justify-center p-2 flex-grow relative max-w-2xl">
      <input type="text" className="w-full border rounded-md !p-1" />
      <button className="absolute top-0 bottom-0 rounded-md right-2.5 m-auto bg-slate-100 h-8 w-8 flex justify-center items-center cursor-pointer group ">
        <SearchIcon className="h-5 text-slate-300 group-hover:text-slate-500 transition duration-300" />
      </button>
    </div>
  );
}
