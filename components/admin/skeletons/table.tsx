import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TableSkeleton() {
  return (
    <>
      <Skeleton height={40} baseColor="#999" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
      <Skeleton height={40} baseColor="#ddd" />
    </>
  );
}
