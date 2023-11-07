import SignUpForm from '@/components/public/forms/signup-form';
// import QueryProvider from '@/providers/query-provider';
import React from 'react';

export default function SignUpPage() {
  return (
    <div className="h-full flex justify-center items-center">
      {/* <QueryProvider> */}
      <SignUpForm />
      {/* </QueryProvider> */}
    </div>
  );
}
