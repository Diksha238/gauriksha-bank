import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function TransferPage() {
  const { user, updateUser } = useAuth();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('transfer');
  const [remarks, setRemarks] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const fmt = (n) => Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  const handleTransfer = async (e) => {
    e.preventDefault();
    setResult('');
    setLoading(true);
    try {
      const msg = await api.transfer(user.id, Number(to), parseFloat(amount), type);
      setResult(msg);
      const updated = await api.getAccount(user.id);
      updateUser(updated);
      setTo('');
      setAmount('');
      setRemarks('');
    } catch (err) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMsgClass = (msg) => {
    if (!msg) return '';
    const m = msg.toLowerCase();
    if (m.includes('block')) return 'result-blk';
    if (m.includes('flag')) return 'result-flag';
    return 'result-ok';
  };

  return (
    <div className="tf-wrap">
      <div className="tf-card">
        <div className="tf-title">Fund Transfer</div>

        <div className="tf-bal-box">
          <div className="tf-bal-label">Available Balance</div>
          <div className="tf-bal-amt">₹{fmt(user?.balance)}</div>
        </div>

        <form onSubmit={handleTransfer}>
          <div className="form-row">
            <div className="form-group">
              <label>From Account</label>
              <select disabled>
                <option>Savings •••• {String(user?.id).slice(-4)}</option>
              </select>
            </div>
            <div className="form-group">
              <label>Transfer Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="transfer">Transfer</option>
                <option value="bill payment">Bill Payment</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Recipient Account ID</label>
            <input type="number" placeholder="Enter recipient account ID" value={to} onChange={(e) => setTo(e.target.value)} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount (₹)</label>
              <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required min="1" />
            </div>
            <div className="form-group">
              <label>Remarks (optional)</label>
              <input type="text" placeholder="Add a note" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </div>
          </div>

          <div className="security-note">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: 6, flexShrink: 0 }}>
              <path d="M8 2l5 2v4c0 3-2 5-5 6C3 13 1 11 1 8V4l7-2z" stroke="#5DCAA5" strokeWidth="1.5"/>
            </svg>
            All transfers are protected by AI-powered fraud detection. Suspicious activity is automatically blocked.
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Transfer'}
          </button>
        </form>

        {result && <div className={`result-box ${getMsgClass(result)}`}>{result}</div>}
      </div>

      <div className="tf-card" style={{ marginTop: 16 }}>
        <div className="tf-title" style={{ fontSize: 15, marginBottom: 14 }}>Quick Actions</div>
        <div className="quick-actions-grid">
          <QuickAction label="Deposit" color="#5DCAA5" onClick={async () => {
            const amt = prompt('Enter deposit amount:');
            if (!amt) return;
            try {
              const updated = await api.deposit(user.id, parseFloat(amt));
              updateUser(updated);
              setResult(`Deposited ₹${parseFloat(amt).toLocaleString('en-IN')} successfully`);
            } catch (err) { setResult(err.message); }
          }} />
          <QuickAction label="Withdraw" color="#F09595" onClick={async () => {
            const amt = prompt('Enter withdrawal amount:');
            if (!amt) return;
            try {
              const updated = await api.withdraw(user.id, parseFloat(amt));
              updateUser(updated);
              setResult(`Withdrawn ₹${parseFloat(amt).toLocaleString('en-IN')} successfully`);
            } catch (err) { setResult(err.message); }
          }} />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ label, color, onClick }) {
  return (
    <button className="qa-btn" onClick={onClick} style={{ borderColor: `${color}33` }}>
      <div style={{ color, fontWeight: 500, fontSize: 14 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Click to proceed</div>
    </button>
  );
}
