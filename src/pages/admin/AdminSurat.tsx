import { useEffect, useState } from 'react';
import { getSurat, Surat } from '../../services/api';
import { Search, FileDown } from 'lucide-react';

export default function AdminSurat() {
  const [surat, setSurat] = useState<Surat[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSurat();
  }, []);

  const fetchSurat = () => {
    setLoading(true);
    getSurat().then(data => {
      setSurat(data.reverse());
    }).catch(console.error).finally(() => setLoading(false));
  };

  const handleUpdateStatus = (id: string | undefined, newStatus: string) => {
    if (!id) return;
    setSurat(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    alert(`Status diubah menjadi ${newStatus}`);
  };

  const filteredSurat = surat.filter(s => 
    s.nama.toLowerCase().includes(search.toLowerCase()) || 
    s.jenis_surat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Validasi Pengajuan Surat</h1>
          <p className="text-sm text-white/50 mt-1">Kelola dan update status pengajuan surat warga.</p>
        </div>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="Cari Nama atau Jenis..." 
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-white placeholder:text-white/40"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden p-6 md:p-8">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-white/50">Memuat data...</div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                  <th className="pb-4 font-bold px-4">Tgl Masuk</th>
                  <th className="pb-4 font-bold px-4">Pemohon</th>
                  <th className="pb-4 font-bold px-4">Jenis Surat & Keperluan</th>
                  <th className="pb-4 font-bold px-4">Status</th>
                  <th className="pb-4 font-bold px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurat.map((s, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-4 px-4 align-top text-white/60 font-mono text-[12px]">
                      {s.tanggal ? new Date(s.tanggal).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="font-medium text-white">{s.nama}</div>
                      <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">NIK: {s.nik}</div>
                    </td>
                    <td className="py-4 px-4 align-top max-w-xs whitespace-normal">
                      <div className="font-medium text-white/90">{s.jenis_surat}</div>
                      <div className="text-white/50 text-xs mt-1 leading-relaxed">{s.keperluan}</div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        s.status?.toLowerCase() === 'pending' || !s.status 
                          ? 'bg-amber-500/10 text-amber-400' 
                          : s.status?.toLowerCase() === 'ditolak'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {s.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4 align-top text-right">
                      {(s.status?.toLowerCase() === 'pending' || !s.status) ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(s.id, 'Disetujui')}
                            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-emerald-500/20"
                          >
                            Setujui
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(s.id, 'Ditolak')}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-red-500/20"
                          >
                            Tolak
                          </button>
                        </div>
                      ) : s.status?.toLowerCase() === 'disetujui' ? (
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-white/5 ml-auto">
                          <FileDown className="w-4 h-4" />
                          Cetak
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
                {filteredSurat.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-white/40">
                      Tidak ada data pengajuan surat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
