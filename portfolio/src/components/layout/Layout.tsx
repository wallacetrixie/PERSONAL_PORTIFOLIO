import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#5C3D2E] via-[#6B4423] to-[#4A2E1F] dark:from-[#5C3D2E] dark:via-[#6B4423] dark:to-[#4A2E1F] transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
