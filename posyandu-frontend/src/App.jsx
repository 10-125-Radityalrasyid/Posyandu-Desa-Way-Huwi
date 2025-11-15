import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// --- Halaman Publik ---
import PublicHomePage from './pages/PublicHomePage';

// --- Halaman Autentikasi ---
import LoginPage from './pages/LoginPage';

// --- Layout & Halaman Internal (Admin/Kader) ---
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import DataBalitaPage from './pages/DataBalitaPage';
import DataIbuHamilPage from './pages/DataIbuHamilPage';
import JadwalPage from './pages/JadwalPage';
import PengaduanPage from './pages/PengaduanPage';
import ManajemenUserPage from './pages/ManajemenUserPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      {/* Route untuk Halaman Login */}
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/admin/dashboard" />} />

      {/* Route untuk Halaman Internal (Admin/Kader) - PALING ATAS SETELAH LOGIN */}
      <Route path="/admin" element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="balita" element={<DataBalitaPage />} />
        <Route path="ibu-hamil" element={<DataIbuHamilPage />} />
        <Route path="jadwal" element={<JadwalPage />} />
        <Route path="pengaduan" element={<PengaduanPage />} />
        {user?.role === 'admin' && <Route path="manajemen-user" element={<ManajemenUserPage />} />}
      </Route>

      {/* Route untuk Halaman Utama (/) dan yang lainnya - PALING BAWAH */}
      <Route path="*" element={<PublicHomePage />} />
    </Routes>
  );
}

export default App;