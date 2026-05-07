import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import WargaData from './pages/WargaData';
import SuratForm from './pages/SuratForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWarga from './pages/admin/AdminWarga';
import AdminSurat from './pages/admin/AdminSurat';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/warga" element={<WargaData />} />
        <Route path="/surat" element={<SuratForm />} />
        <Route path="/login" element={<AdminLogin />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="warga" element={<AdminWarga />} />
        <Route path="surat" element={<AdminSurat />} />
      </Route>
    </Routes>
  );
}

export default App;
