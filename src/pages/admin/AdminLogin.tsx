import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Username atau password salah.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#141414] p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-teal-500/20" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
            <Shield className="w-8 h-8" />
          </div>
        </div>
        
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">Portal Admin</h1>
          <p className="text-white/40 text-sm">Gunakan username: admin, pass: admin123</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Username</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Password</label>
            <input 
              required
              type="password" 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 mt-8 bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
          >
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
