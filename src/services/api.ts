// Get API URL from ENV, or leave empty to use local mock mode
const API_URL = import.meta.env.VITE_GAS_API_URL || '';

// --- TYPES ---
export interface Warga {
  nik: string;
  nama: string;
  alamat: string;
  rt: string;
  rw: string;
  pekerjaan: string;
  status: string;
  no_hp: string;
}

export interface Surat {
  id?: string;
  tanggal?: string;
  nik: string;
  nama: string;
  jenis_surat: string;
  keperluan: string;
  status?: string;
}

// --- MOCK LOCAL DATA (For Preview purposes if API_URL is not set) ---
let mockWarga: Warga[] = [
  { nik: '3271123456780001', nama: 'Budi Santoso', alamat: 'Jl. Melati No 14', rt: '01', rw: '02', pekerjaan: 'Wiraswasta', status: 'Menikah', no_hp: '081234567890' },
  { nik: '3271123456780002', nama: 'Siti Aminah', alamat: 'Jl. Melati No 15', rt: '01', rw: '02', pekerjaan: 'Ibu Rumah Tangga', status: 'Menikah', no_hp: '081298765432' }
];

let mockSurat: Surat[] = [
  { id: '1', tanggal: new Date().toISOString(), nik: '3271123456780001', nama: 'Budi Santoso', jenis_surat: 'Surat Pengantar SKCK', keperluan: 'Melamar Pekerjaan', status: 'Pending' }
];

// --- API FUNCTIONS ---
export const getWarga = async (): Promise<Warga[]> => {
  if (!API_URL) return [...mockWarga];
  const response = await fetch(`${API_URL}?action=getWarga`);
  const data = await response.json();
  // Handle array of arrays from GAS (remove header line if present)
  if (Array.isArray(data) && data.length > 0 && data[0][0] === 'nik') {
    data.shift(); 
  }
  return data.map((row: any) => ({
    nik: row[0], nama: row[1], alamat: row[2], rt: row[3], rw: row[4],
    pekerjaan: row[5], status: row[6], no_hp: row[7]
  }));
};

export const getSurat = async (): Promise<Surat[]> => {
  if (!API_URL) return [...mockSurat];
  const response = await fetch(`${API_URL}?action=getSurat`);
  const data = await response.json();
  if (Array.isArray(data) && data.length > 0 && data[0][0] === 'id') {
    data.shift();
  }
  return data.map((row: any) => ({
    id: row[0], tanggal: row[1], nik: row[2], nama: row[3],
    jenis_surat: row[4], keperluan: row[5], status: row[6]
  }));
};

export const addWarga = async (data: Warga) => {
  if (!API_URL) {
    mockWarga.push({ ...data });
    return { success: true };
  }
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: 'addWarga',
      ...data,
    }),
  });
  return await response.json();
};

export const deleteWarga = async (nik: string) => {
  if (!API_URL) {
    mockWarga = mockWarga.filter(w => w.nik !== nik);
    return { success: true };
  }
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: 'deleteWarga',
      nik: nik,
    }),
  });
  return await response.json();
};

export const addSurat = async (data: Surat) => {
  if (!API_URL) {
    mockSurat.push({ ...data, id: Date.now().toString(), tanggal: new Date().toISOString(), status: 'Pending' });
    return { success: true };
  }
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: 'addSurat',
      ...data,
    }),
  });
  return await response.json();
};

