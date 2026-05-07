import { useEffect, useState } from 'react';
import { getWarga, Warga, deleteWarga } from '../../services/api';
import { Search, Trash2 } from 'lucide-react';

export default function AdminWarga() {
  const [warga, setWarga] = useState<Warga[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getWarga().then(data => {
      setWarga(data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (nik: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data warga bernama ${nama}?`)) {
      try {
        const result = await deleteWarga(nik);
        if (result.success) {
          setWarga(prev => prev.filter(w => w.nik !== nik));
          alert("Data warga berhasil dihapus.");
        } else {
          alert(result.error || "Gagal menghapus data warga.");
        }
      } catch (err: any) {
        console.error(err);
        alert("ERROR: " + err.message);
      }
    }
  };

  const filteredWarga = warga.filter(w => 
    w.nama.toLowerCase().includes(search.toLowerCase()) || 
    w.nik.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Data Warga RT</h1>
          <p className="text-sm text-white/50 mt-1">Kelola dan lihat data warga terdaftar secara keseluruhan.</p>
        </div>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="Cari NIK atau Nama..." 
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
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                  <th className="pb-4 font-bold px-2">NIK</th>
                  <th className="pb-4 font-bold px-2">Nama Lengkap</th>
                  <th className="pb-4 font-bold px-2">Alamat & Blok</th>
                  <th className="pb-4 font-bold px-2">Pekerjaan</th>
                  <th className="pb-4 font-bold px-2">No. HP</th>
                  <th className="pb-4 font-bold px-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarga.map((w, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-4 px-2 font-mono text-[12px] text-white/60">{w.nik}</td>
                    <td className="py-4 px-2 text-white">{w.nama}</td>
                    <td className="py-4 px-2 text-white/80">
                      <div>{w.alamat}</div>
                      <div className="text-[9px] uppercase tracking-wider text-white/40 mt-1">RT {w.rt} / RW {w.rw}</div>
                    </td>
                    <td className="py-4 px-2">
                       <span className="px-2 py-1 bg-white/5 text-white/60 text-[10px] rounded">{w.pekerjaan?.slice(0, 20)}</span>
                    </td>
                    <td className="py-4 px-2 text-emerald-400/80 font-mono text-xs">{w.no_hp}</td>
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => handleDelete(w.nik, w.nama)}
                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
                        title="Hapus Warga"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredWarga.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                      Tidak ada data warga ditemukan.
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
