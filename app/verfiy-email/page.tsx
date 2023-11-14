import VerifyEmailForm from '@/components/public/forms/verify-email-form';
import React from 'react';

export default function VerifyEmailPage() {
  return (
    <div className="h-full w-5/6 m-auto">
      <h1 className="text-center text-blue-900 font-bold mt-10">
        Please verify your email first
      </h1>
      <VerifyEmailForm />
    </div>
  );
}
