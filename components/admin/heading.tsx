import React from 'react';

export default function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-bold text-slate-800">{children}</h1>;
}
