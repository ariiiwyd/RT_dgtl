import { Link } from "react-router-dom";
import { Users, FileText, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12 lg:py-24">
      <div className="text-center mb-20 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Layanan Digital RT Aktif 24/7</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight">
          Administrasi RT,
          <br />
          <span className="italic text-emerald-400">Diperbarui.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
          Platform digital mandiri untuk mempermudah warga dalam melakukan pendataan dan pengajuan surat pengantar RT secara online.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            to="/warga"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-colors"
          >
            <Users className="w-4 h-4" />
            Pendataan Warga
          </Link>
          <Link
            to="/surat"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Pengajuan Surat
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        <div className="bg-[#141414] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white/5 text-white/60 rounded-2xl flex items-center justify-center mb-6">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif text-white mb-3">Data Terpusat</h3>
          <p className="text-white/40 text-sm leading-relaxed">Semua data warga tersimpan rapi dan aman dalam satu dashboard digital.</p>
        </div>
        <div className="bg-[#141414] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif text-white mb-3">Otomatisasi Surat</h3>
          <p className="text-white/40 text-sm leading-relaxed">Ajukan jenis surat pengantar secara mandiri di mana saja.</p>
        </div>
        <div className="bg-[#141414] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white/5 text-white/60 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif text-white mb-3">Verifikasi Cepat</h3>
          <p className="text-white/40 text-sm leading-relaxed">Status pengajuan surat dapat dipantau dan divalidasi langsung oleh Ketua RT.</p>
        </div>
      </div>
    </div>
  );
}
