import { TopMenu, NavBar } from '@/components';

export const Header = () => {
  return (
    <header className="relative flex justify-center min-w-screen bg-white">
      <div className="shadow-md w-full">
        <TopMenu />
        <NavBar />
      </div>
    </header >
  );
};