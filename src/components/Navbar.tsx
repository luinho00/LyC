import React from 'react'

export default function Navbar({ user, onLogout }: { user: string; onLogout: () => void }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-brand">🔥 Leña & Carbón</h1>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <span className="user-name">{user}</span>
          <span className="user-badge">👤</span>
        </div>
        <button className="btn-logout-nav" onClick={onLogout}>
          Salir
        </button>
      </div>
    </nav>
  )
}
