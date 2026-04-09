import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function HistoryPage() {
  const { user } = useAuth();
  const [txns, setTxns] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions(user.id)
      .then((data) => setTxns([...data].reverse()))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user.id]);

  const fmt = (n) => Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  const filtered = txns.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'credit') return t.type === 'deposit';
    if (filter === 'debit') return t.type !== 'deposit';
    return true;
  });

  return (
    <div className="history-wrap">
      <div className="history-header">
        <div className="history-title">Transaction History</div>
        <div className="history-count">{txns.length} transactions</div>
      </div>

      <div className="filters">
        {['all', 'credit', 'debit'].map((f) => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && <div className="loading-msg">Loading transactions...</div>}

      {!loading && filtered.length === 0 && (
        <div className="empty-msg">No transactions found</div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="txn-list">
          {filtered.map((t) => {
            const isCredit = t.type?.toUpperCase() === 'DEPOSIT';
            return (
              <div className="txn-row" key={t.id}>
                <div className={`txn-ico ${isCredit ? 'ico-cr' : 'ico-db'}`}>
                  {isCredit
                    ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#F09595" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  }
                </div>
                <div className="txn-meta">
                  <div className="txn-name">
                    {t.type?.charAt(0).toUpperCase() + t.type?.slice(1)}
                    <span className="badge badge-ok">Successful</span>
                  </div>
                  <div className="txn-date">
                    {t.timestamp ? new Date(t.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                    {' '}• Savings •••• {String(user?.id).slice(-4)}
                  </div>
                </div>
                <div className={`txn-amt ${isCredit ? 'cr' : 'db'}`}>
                  {isCredit ? '+' : '-'}₹{fmt(t.amount)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
