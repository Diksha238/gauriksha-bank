import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function DashboardPage({ setPage }) {
  const { user, updateUser } = useAuth();
  const [showBal, setShowBal] = useState(true);
  const [txns, setTxns] = useState([]);
  const [quickAmt, setQuickAmt] = useState('');
  const [quickTo, setQuickTo] = useState('');
  const [quickType, setQuickType] = useState('transfer');
  const [quickMsg, setQuickMsg] = useState('');
  const [quickLoading, setQuickLoading] = useState(false);

  useEffect(() => {
    api.getTransactions(user.id).then(setTxns).catch(() => {});
  }, [user.id]);

  const refreshBalance = async () => {
    try {
      const updated = await api.getAccount(user.id);
      updateUser(updated);
    } catch {}
  };

  const handleQuickTransfer = async (e) => {
    e.preventDefault();
    if (!quickTo || !quickAmt) return;
    setQuickLoading(true);
    setQuickMsg('');
    try {
      const result = await api.transfer(user.id, Number(quickTo), parseFloat(quickAmt), quickType);
      setQuickMsg(result);
      await refreshBalance();
      const updated = await api.getTransactions(user.id);
      setTxns(updated);
      setQuickAmt('');
      setQuickTo('');
    } catch (err) {
      setQuickMsg(err.message);
    } finally {
      setQuickLoading(false);
    }
  };

  const fmt = (n) => Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });
  const recentTxns = txns.slice(-5).reverse();

  const getMsgClass = (msg) => {
    if (!msg) return '';
    const m = msg.toLowerCase();
    if (m.includes('block')) return 'result-blk';
    if (m.includes('flag')) return 'result-flag';
    return 'result-ok';
  };

  return (
    <div className="dash-wrap">
      <div className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-welcome">Welcome, {user?.name}</div>
            <div className="hero-sub">Last logged in today</div>
          </div>
          <div className="bal-toggle-row">
            <span className="bal-toggle-label">Show Balance</span>
            <div className={`toggle ${showBal ? 'on' : ''}`} onClick={() => setShowBal(!showBal)}>
              <div className="toggle-dot" />
            </div>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-main">
          <div className="cards-row">
            <div className="acct-card light">
              <div className="acct-label">Savings Account</div>
              <div className="acct-num">•••• •••• {String(user?.id).padStart(4, '0').slice(-4)}</div>
              <div className="acct-amt">{showBal ? `₹${fmt(user?.balance)}` : '₹ ••••••'}</div>
              <div className="acct-footer">
                <button className="card-cta" onClick={() => setPage('history')}>Get Statement</button>
                <button className="card-arrow" onClick={() => setPage('transfer')}>→</button>
              </div>
            </div>
            <div className="acct-card purple">
              <div className="acct-label">Quick Transfer</div>
              <div className="acct-desc">Send money instantly to any account</div>
              <button className="card-cta-outline" onClick={() => setPage('transfer')}>Transfer Now →</button>
            </div>
            <div className="acct-card purple2">
              <div className="acct-label">AI Fraud Protection</div>
              <div className="acct-desc">All transactions monitored 24/7</div>
              <button className="card-cta-outline" onClick={() => setPage('history')}>View Activity →</button>
            </div>
          </div>

          <div className="section-hd">Recent transactions</div>
          <div className="txn-list">
            {recentTxns.length === 0 && (
              <div style={{ padding: '20px 16px', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>No transactions yet</div>
            )}
            {recentTxns.map((t) => (
              <div className="txn-row" key={t.id}>
                <div className={`txn-ico ${t.type?.toUpperCase() === 'DEPOSIT' ? 'ico-cr' : 'ico-db'}`}>
                  {t.type === 'deposit'
                    ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#F09595" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  }
                </div>
                <div className="txn-meta">
                  <div className="txn-name">{t.type?.charAt(0).toUpperCase() + t.type?.slice(1)}</div>
                  <div className="txn-date">{t.timestamp ? new Date(t.timestamp).toLocaleString('en-IN') : '—'}</div>
                </div>
                <div className={`txn-amt ${t.type?.toUpperCase() === 'DEPOSIT' ? 'cr' : 'db'}`}>
  {t.type?.toUpperCase() === 'DEPOSIT' ? '+' : '-'}₹{fmt(t.amount)}
                </div>
              </div>
            ))}
            <div style={{ padding: '12px 16px', textAlign: 'center' }}>
              <button className="view-all-btn" onClick={() => setPage('history')}>View all transactions</button>
            </div>
          </div>
        </div>

        <div className="dash-sidebar">
          <div className="sidebar-title">My Favourite Links</div>
          {[
            { label: 'Account Statement', page: 'history' },
            { label: 'Fund Transfer', page: 'transfer' },
            { label: 'Transaction History', page: 'history' },
          ].map((item) => (
            <div className="fav-item" key={item.label} onClick={() => setPage(item.page)}>
              <div className="fav-left">
                <div className="fav-icon">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#a29bfe" strokeWidth="1.5"/><path d="M5 7h6M5 10h4" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                {item.label}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>›</span>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-bar">
        <div className="quick-title">
          Send Money
          <span className="quick-badge">Domestic</span>
        </div>
        <form className="quick-grid" onSubmit={handleQuickTransfer}>
          <div className="sm-field">
            <label>To (Account ID)</label>
            <input type="number" placeholder="Recipient ID" value={quickTo} onChange={(e) => setQuickTo(e.target.value)} />
          </div>
          <div className="sm-field">
            <label>Amount (₹)</label>
            <input type="number" placeholder="0.00" value={quickAmt} onChange={(e) => setQuickAmt(e.target.value)} />
          </div>
          <div className="sm-field">
            <label>Type</label>
            <select value={quickType} onChange={(e) => setQuickType(e.target.value)}>
              <option value="transfer">Transfer</option>
              <option value="bill payment">Bill Payment</option>
            </select>
          </div>
          <div className="sm-field">
            <label>&nbsp;</label>
            <button type="submit" className="btn-primary" disabled={quickLoading}>
              {quickLoading ? 'Processing...' : 'Proceed'}
            </button>
          </div>
        </form>
        {quickMsg && <div className={`result-box ${getMsgClass(quickMsg)}`}>{quickMsg}</div>}
      </div>
    </div>
  );
}
