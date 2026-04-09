import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onRegister }) {
  const { login } = useAuth();
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(id, pin);
      login(data);
    } catch {
      setError('Invalid Account ID or PIN. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="1.8"/>
              <path d="M9 22V12h6v10" stroke="white" strokeWidth="1.8"/>
            </svg>
          </div>
          <div className="auth-logo-text">Gauriksha Bank</div>
          <div className="auth-logo-sub">SECURE INTERNET BANKING</div>
        </div>

        <div className="auth-divider" />

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Account ID</label>
            <input
              type="text"
              placeholder="Enter your account ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>PIN</label>
            <input
              type="password"
              placeholder="4-digit PIN"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to NetBanking'}
          </button>
        </form>

        <p className="auth-switch">
          New customer?{' '}
          <span onClick={onRegister}>Open an account</span>
        </p>
      </div>
    </div>
  );
}
