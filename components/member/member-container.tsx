import React from 'react';
import Header from '../public/header';
import MemberNavigation from './member-navigation';

export default function MemberContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="p-4 max-w-6xl mt-5 mx-auto">
        <MemberNavigation />
        {children}
      </main>
    </>
  );
}
