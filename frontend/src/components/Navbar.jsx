import { useAuth } from '../context/AuthContext';

export default function Navbar({ activePage, setPage }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo" onClick={() => setPage('dashboard')}>
          <div className="nav-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2"/>
              <path d="M9 22V12h6v10" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <div className="nav-logo-text">Gauriksha Bank</div>
            <div className="nav-logo-sub">NET BANKING</div>
          </div>
        </div>

        <div className="nav-links">
          <button className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>Home</button>
          <button className={`nav-link ${activePage === 'transfer' ? 'active' : ''}`} onClick={() => setPage('transfer')}>Send Money</button>
          <button className={`nav-link ${activePage === 'history' ? 'active' : ''}`} onClick={() => setPage('history')}>Transactions</button>
        </div>

        <div className="nav-right">
          <div className="nav-avatar" title={user?.name}>
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>
          <button className="nav-logout" onClick={logout} title="Logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="mob-nav">
        <button className={`mob-nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8"/></svg>
          <span>Home</span>
        </button>
        <button className={`mob-nav-item ${activePage === 'transfer' ? 'active' : ''}`} onClick={() => setPage('transfer')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span>Transfer</span>
        </button>
        <button className={`mob-nav-item ${activePage === 'history' ? 'active' : ''}`} onClick={() => setPage('history')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 10h10M7 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span>History</span>
        </button>
        <button className="mob-nav-item" onClick={logout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
