import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TransferPage from './pages/TransferPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';
import './App.css';

function AppContent() {
  const { user } = useAuth();
  const [authPage, setAuthPage] = useState('login');
  const [page, setPage] = useState('dashboard');

  if (!user) {
    return authPage === 'login'
      ? <LoginPage onRegister={() => setAuthPage('register')} />
      : <RegisterPage onLogin={() => setAuthPage('login')} />;
  }

  return (
    <div className="app-shell">
      <Navbar activePage={page} setPage={setPage} />
      <main className="app-main">
        {page === 'dashboard' && <DashboardPage setPage={setPage} />}
        {page === 'transfer' && <TransferPage />}
        {page === 'history' && <HistoryPage />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
