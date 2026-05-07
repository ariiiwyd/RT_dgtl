import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Mail, LogOut, Menu } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simple auth check
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Data Warga', path: '/admin/warga', icon: Users },
    { name: 'Pengajuan Surat', path: '/admin/surat', icon: Mail },
  ];

  return (
    <div className="min-h-screen flex font-sans bg-[#0A0A0A] text-gray-300 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0D0D0D] border-r border-white/10 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:transform-none",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div>
          <div className="h-20 flex items-center px-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xs">RT</span>
              </div>
              <h1 className="text-xl font-serif font-semibold text-white tracking-tight">RT.DIGITAL</h1>
            </div>
          </div>

          <nav className="px-4 py-8 space-y-8 overflow-y-auto">
            <div className="space-y-2">
              <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-4">Main Menu</p>
              {sidebarLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer",
                      isActive 
                        ? "bg-white/5 border border-white/10 text-white" 
                        : "text-white/60 hover:text-white border border-transparent"
                    )}
                  >
                    <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-emerald-400" : "bg-transparent")} />
                    <span className="text-sm font-medium">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="p-8">
          <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">System Status</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">Connected to Google Sheets API via Vercel Edge.</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Keluar ke Portal
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-[#0A0A0A] to-[#121212]">
        <header className="h-20 px-6 md:px-10 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-white/60 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xs md:text-sm font-serif italic text-white/50">Wilayah Administrasi</h2>
              <p className="text-sm md:text-lg font-semibold text-white">Rukun Tetangga 05 / RW 12</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-white">Bpk. Bambang Pamungkas</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Ketua RT</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 p-0.5">
              <div className="w-full h-full rounded-full bg-emerald-900 flex items-center justify-center text-xs font-bold text-emerald-400">BP</div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
