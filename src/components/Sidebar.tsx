import React from 'react'

export type ModuleKey = 'inventory' | 'kitchen' | 'loyalty' | 'reports' | 'social' | 'orders'

const modules: Array<{ key: ModuleKey; icon: string; label: string }> = [
  { key: 'inventory', icon: '📦', label: 'Inventario' },
  { key: 'kitchen', icon: '🔥', label: 'Cocina' },
  { key: 'loyalty', icon: '🤝', label: 'Fidelización' },
  { key: 'reports', icon: '📊', label: 'Reportes' },
  { key: 'social', icon: '📱', label: 'Redes Sociales' },
  { key: 'orders', icon: '🛒', label: 'Pedidos Digitales' },
]

export default function Sidebar({
  activeModule,
  onSelect,
}: {
  activeModule: ModuleKey
  onSelect: (module: ModuleKey) => void
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Módulos</h2>
      </div>

      <nav className="sidebar-nav">
        {modules.map(mod => (
          <button
            key={mod.key}
            className={`sidebar-item ${activeModule === mod.key ? 'active' : ''}`}
            onClick={() => onSelect(mod.key)}
          >
            <span className="sidebar-icon">{mod.icon}</span>
            <span className="sidebar-label">{mod.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-version">v1.0.0</p>
      </div>
    </aside>
  )
}
