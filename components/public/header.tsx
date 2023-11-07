import UserNav from './user-nav';
import Logo from './logo';
import Search from './search';

export default async function Header() {
  return (
    <div className="flex justify-between">
      <Logo />
      <Search />
      <UserNav />
    </div>
  );
}
