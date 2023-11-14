import Header from '@/components/public/header';
import Toastit from '@/components/toastit';
import { redirect } from 'next/navigation';
export default async function Public() {
  return (
    <div>
      <Header />
      <Toastit />
    </div>
  );
}
