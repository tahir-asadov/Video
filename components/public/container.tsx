import Header from './header';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4">{children}</main>
    </>
  );
}
