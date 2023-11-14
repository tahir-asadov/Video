'use client';

import Error from '@/components/public/error';
import route from '@/lib/routes';
import { NotificationContext } from '@/providers/notification-provider';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useState } from 'react';

export default function VerifyEmailForm() {
  const [error, setError] = useState('');
  const { flash } = useContext(NotificationContext);
  const router = useRouter();
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString();
    if (email) {
      setError('');
      fetch(route('api.sendVerificationEmail'), {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      flash({ message: 'Email sent', status: 'success' });

      setTimeout(() => {
        router.push(route('home'));
      }, 1200);
    } else {
      setError('Email is required');
    }
    console.log();
  };
  return (
    <div className="w-2/5 m-auto mt-5">
      <form className="flex flex-col items-center" onSubmit={submitForm}>
        <input
          required
          type="email"
          name="email"
          className="text-input my-2"
          placeholder="Your email"
        />
        {error && <Error message={error} />}
        <button type="submit" className="button">
          Send verification email
        </button>
      </form>
    </div>
  );
}
