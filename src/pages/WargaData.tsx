import { useState } from 'react';
import { addWarga } from '../services/api';

export default function WargaData() {
  const [form, setForm] = useState({
    nik: '',
    nama: '',
    alamat: '',
    rt: '',
    rw: '',
    pekerjaan: '',
    status: '',
    no_hp: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    
    try {
      await addWarga(form);
      setSuccessMsg('Data berhasil disimpan!');
      setForm({
        nik: '', nama: '', alamat: '', rt: '', rw: '', pekerjaan: '', status: '', no_hp: ''
      });
    } catch (err) {
      alert('Gagal menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
        <div className="border-b border-white/5 bg-white/[0.02] px-8 py-8">
          <h1 className="text-2xl font-serif text-white">Form Pendataan Warga</h1>
          <p className="text-white/50 mt-2 text-sm leading-relaxed">Silakan isi data diri Anda dengan lengkap dan benar sesuai KTP/KK.</p>
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
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">NIK (Nomor Induk Kependudukan)</label>
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
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Nama Lengkap</label>
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
              <label className="text-xs font-bold uppercase tracking-widest text-white/60">Alamat Lengkap</label>
              <textarea
                required
                rows={2}
                placeholder="Jl. Mawar No. 12"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow resize-none text-white placeholder:text-white/20"
                value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">RT (001)</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: 01"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
                  value={form.rt}
                  onChange={(e) => setForm({ ...form, rt: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">RW (002)</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: 02"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
                  value={form.rw}
                  onChange={(e) => setForm({ ...form, rw: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Pekerjaan</label>
                <input
                  required
                  type="text"
                  placeholder="Karyawan Swasta"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
                  value={form.pekerjaan}
                  onChange={(e) => setForm({ ...form, pekerjaan: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Status Pernikahan</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white [&>option]:bg-[#141414] [&>option]:text-white"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="" disabled>Pilih Status</option>
                  <option value="Belum Kawin">Belum Kawin</option>
                  <option value="Kawin">Kawin</option>
                  <option value="Cerai Hidup">Cerai Hidup</option>
                  <option value="Cerai Mati">Cerai Mati</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/60">Nomor HP/WhatsApp</label>
              <input
                required
                type="text"
                placeholder="08123456789"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow text-white placeholder:text-white/20"
                value={form.no_hp}
                onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-70 disabled:hover:bg-emerald-500"
            >
              {loading ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
