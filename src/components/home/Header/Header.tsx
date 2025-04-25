import { TopMenu, NavBar } from '@/components';

export const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full h-14 sm:h-16 md:h-20 flex justify-center bg-white">
      <div className="shadow-md w-full">
        <TopMenu />
        <NavBar />
      </div>
    </header >
  );
};