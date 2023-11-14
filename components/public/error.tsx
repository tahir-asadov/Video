export default function Error({ message }: { message: string | null }) {
  return <p className="text-rose-500 italic text-sm">{message}</p>;
}
