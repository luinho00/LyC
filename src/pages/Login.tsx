import React, { useState } from 'react'

export default function Login({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === '1234') {
      setError('')
      onLogin(username)
    } else {
      setError('Usuario o contraseña incorrectos. Usa: admin / 1234')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>🏢 Lena & Carbón CRM</h1>
            <p className="subtitle">Sistema de Gestión Empresarial</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-box">{error}</div>}

            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-login">
              Acceder
            </button>
          </form>

          <div className="login-hint">
            <p>Demo: <strong>admin</strong> / <strong>1234</strong></p>
          </div>
        </div>

        <div className="login-side">
          <h3>Bienvenido</h3>
          <p>Acceso seguro al sistema de gestión de inventario, cocina y reportes de Lena & Carbón.</p>
          <ul className="feature-list">
            <li>✓ Control de Inventario</li>
            <li>✓ Gestión de Cocina</li>
            <li>✓ Fidelización de Clientes</li>
            <li>✓ Reportes Analíticos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
