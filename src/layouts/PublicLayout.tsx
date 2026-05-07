import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Shield } from 'lucide-react';

export default function PublicLayout() {
  const location = useLocation();

  const navLinks = [
    { name: 'Portal Beranda', path: '/' },
    { name: 'Pendataan', path: '/warga' },
    { name: 'Pengajuan', path: '/surat' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col font-sans text-gray-300">
      <header className="bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">RT</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-white tracking-tight">RT.DIGITAL</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold">Portal Warga</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-white py-2",
                    isActive ? "text-white" : "text-white/50"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-colors"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Portal Admin</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-6 lg:p-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 py-8 text-center mt-auto mt-12 bg-[#0A0A0A]">
        <div className="flex items-center justify-center gap-3 mb-2">
           <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
             RT
           </div>
           <span className="font-serif text-white text-sm">RT.DIGITAL</span>
        </div>
        <p className="text-white/30 text-[11px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Sistem Informasi RT Online.
        </p>
      </footer>
    </div>
  );
}
