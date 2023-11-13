import React from 'react';
import Header from '../public/header';
import Navigation from './navigation';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4 max-w-6xl mt-5 mx-auto">
        <Navigation />
        {children}
      </main>
    </>
  );
}
