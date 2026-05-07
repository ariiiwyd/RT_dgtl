import { useEffect, useState } from 'react';
import { getWarga, getSurat, Warga, Surat } from '../../services/api';

export default function AdminDashboard() {
  const [warga, setWarga] = useState<Warga[]>([]);
  const [surat, setSurat] = useState<Surat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resWarga, resSurat] = await Promise.all([getWarga(), getSurat()]);
        setWarga(resWarga);
        setSurat(resSurat);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-white/60">Memuat data dashboard...</div>;
  }

  const pendingSurat = surat.filter(s => s.status?.toLowerCase() === 'pending' || !s.status).length;
  const selesaiSurat = surat.filter(s => s.status?.toLowerCase() === 'selesai' || s.status?.toLowerCase() === 'disetujui').length;

  return (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#141414] border border-white/5 rounded-2xl">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Total Warga</p>
          <p className="text-3xl font-serif text-white">{warga.length}</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400">
            <span>Terdata dalam sistem</span>
          </div>
        </div>
        <div className="p-6 bg-[#141414] border border-white/5 rounded-2xl">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Total Pengajuan Surat</p>
          <p className="text-3xl font-serif text-white">{surat.length}</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-white/20">
            <span>Seluruh waktu</span>
          </div>
        </div>
        <div className="p-6 bg-[#141414] border border-white/5 rounded-2xl">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Surat Pending</p>
          <p className="text-3xl font-serif text-emerald-400">{pendingSurat}</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400/60">
            <span>Butuh Tindakan</span>
          </div>
        </div>
        <div className="p-6 bg-[#141414] border border-white/5 rounded-2xl">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Surat Selesai</p>
          <p className="text-3xl font-serif text-white">{selesaiSurat}</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-white/20">
            <span>Telah Disetujui/Selesai</span>
          </div>
        </div>
      </div>

      {/* Main Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-4">
        {/* Table Area */}
        <div className="col-span-1 lg:col-span-2 bg-[#141414] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif text-white">Pengajuan Surat Terbaru</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                  <th className="pb-4 font-bold min-w-[100px]">Tanggal</th>
                  <th className="pb-4 font-bold min-w-[150px]">Nama Lengkap</th>
                  <th className="pb-4 font-bold min-w-[150px]">Jenis Surat</th>
                  <th className="pb-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {surat.slice(-5).reverse().map((s, i) => {
                  const isPending = s.status?.toLowerCase() === 'pending' || !s.status;
                  return (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="py-4 font-mono text-[12px] text-white/60">
                        {s.tanggal ? new Date(s.tanggal).toLocaleDateString('id-ID') : '-'}
                      </td>
                      <td className="py-4 text-white">{s.nama}</td>
                      <td className="py-4 text-white/80">{s.jenis_surat}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-[10px] rounded ${
                          isPending ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {s.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {surat.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-white/40 text-sm">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications/Requests Area */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 flex flex-col flex-1">
            <h3 className="text-lg font-serif text-white mb-6">Warga Terbaru</h3>
            <div className="space-y-4 flex-1">
              {warga.slice(-3).reverse().map((w, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-white">{w.nama}</p>
                    <span className="text-[9px] text-white/50">{w.rt}/{w.rw}</span>
                  </div>
                  <p className="text-[11px] text-white/40">{w.alamat}</p>
                  <p className="text-[11px] text-emerald-400/80 mt-2">{w.pekerjaan}</p>
                </div>
              ))}
              {warga.length === 0 && (
                <div className="text-center py-4 text-white/40 text-sm">Belum ada warga</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
