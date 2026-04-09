import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ onLogin }) {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (pin !== confirmPin) { setError('PINs do not match.'); return; }
    if (pin.length !== 4) { setError('PIN must be exactly 4 digits.'); return; }
    setLoading(true);
    try {
      const data = await api.register(name, pin);
      login(data);
    } catch {
      setError('Registration failed. Please try again.');
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
          <div className="auth-logo-sub">CREATE YOUR ACCOUNT</div>
        </div>

        <div className="auth-divider" />

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Set PIN</label>
            <input type="password" placeholder="Choose a 4-digit PIN" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm PIN</label>
            <input type="password" placeholder="Re-enter your PIN" maxLength={4} value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} required />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <span onClick={onLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}
