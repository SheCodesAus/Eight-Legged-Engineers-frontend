import './BottomNav.css'

function BottomNav({ activePage }) {
  return (
    <nav className="bottom-nav">
      <button className={`nav-btn ${activePage === 'home' ? 'active' : ''}`}>
        <span className="nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </span>
        <span className="nav-label">Home</span>
      </button>

      <button className={`nav-btn ${activePage === 'profile' ? 'active' : ''}`}>
        <span className="nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
          </svg>
        </span>
        <span className="nav-label">Profile</span>
      </button>
    </nav>
  )
}

export default BottomNav
