import Header from '@/components/public/header';
import Toastit from '@/components/toastit';
import { redirect } from 'next/navigation';
export default async function Public() {
  // console.log('this is Public server component')
  // redirect('/?from=public')
  return (
    <div>
      <Header />
      <Toastit />
    </div>
  );
}
