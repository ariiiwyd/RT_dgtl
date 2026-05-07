import { useState } from 'react';
import { addSurat } from '../services/api';

export default function SuratForm() {
  const [form, setForm] = useState({
    nik: '',
    nama: '',
    jenis_surat: '',
    keperluan: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const jenisSuratOptions = [
    'Surat Domisili',
    'Surat Pengantar SKCK',
    'Surat Keterangan Usaha',
    'Surat Tidak Mampu',
    'Surat Pengantar Nikah',
    'Surat Kematian',
    'Surat Pindah',
    'Surat Kelahiran'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    
    try {
      await addSurat(form);
      setSuccessMsg('Pengajuan surat berhasil dikirim! Admin RT akan segera memprosesnya.');
      setForm({ nik: '', nama: '', jenis_surat: '', keperluan: '' });
    } catch (err) {
      alert('Gagal mengajukan surat.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
        <div className="border-b border-white/5 bg-white/[0.02] px-8 py-8">
          <h1 className="text-2xl font-serif text-white">Pengajuan Surat RT</h1>
          <p className="text-white/50 mt-2 text-sm leading-relaxed">Ajukan surat pengantar secara mandiri. Pastikan data diri (NIK/Nama) sudah terdaftar di Data Warga.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {successMsg && (
            <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl border border-emerald-500/20 text-sm font-medium">
              {successMsg}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">NIK Pemohon</label>
                <input
                  required
                  type="text"
                  placeholder="327xxxxxxxxxxxxx"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
                  value={form.nik}
                  onChange={(e) => setForm({ ...form, nik: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Nama Pemohon</label>
                <input
                  required
                  type="text"
                  placeholder="Budi Santoso"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/60">Jenis Surat</label>
              <select
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white [&>option]:bg-[#141414] [&>option]:text-white"
                value={form.jenis_surat}
                onChange={(e) => setForm({ ...form, jenis_surat: e.target.value })}
              >
                <option value="" disabled>Pilih Jenis Surat</option>
                {jenisSuratOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/60">Keperluan (Tujuan/Alasan)</label>
              <textarea
                required
                rows={3}
                placeholder="Contoh: Mengurus pembuatan SKCK di Polsek setempat untuk melamar pekerjaan."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow resize-none text-white placeholder:text-white/20"
                value={form.keperluan}
                onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-70 disabled:hover:bg-emerald-500"
            >
              {loading ? 'Mengajukan...' : 'Ajukan Surat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
