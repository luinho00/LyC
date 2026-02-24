import React, { useState } from 'react'
import InventorySection from '../components/InventorySection'
import KitchenSection from '../components/KitchenSection'
import LoyaltySection from '../components/LoyaltySection'
import ReportsSection from '../components/ReportsSection'

type Feature = {
  nivel1: string
  nivel2: string
  nivel3: string
  actor: string
  descripcion: string
}

export default function Dashboard({
  features,
  user,
  onLogout,
}: {
  features: Feature[]
  user: string
  onLogout: () => void
}) {
  const modules = ['Inventario', 'Cocina', 'Fidelización', 'Reportes']
  const icons: Record<string, string> = {
    Inventario: '📦',
    Cocina: '🔥',
    Fidelización: '🤝',
    Reportes: '📊',
  }

  const stats = modules.map((m) => ({
    name: m,
    count: features.filter((f) => f.nivel2 === m).length,
  }))

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard CRM</h1>
          <p className="header-sub">Bienvenido, <strong>{user}</strong></p>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Cerrar sesión
        </button>
      </header>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="stat-icon">{icons[stat.name]}</div>
            <div className="stat-content">
              <h3>{stat.name}</h3>
              <p className="stat-number">{stat.count} funcionalidades</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sections-container">
        <InventorySection />
        <KitchenSection />
        <LoyaltySection />
        <ReportsSection />
      </div>
    </div>
  )
}
