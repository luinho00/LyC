import React from 'react'

type Feature = {
  nivel1: string
  nivel2: string
  nivel3: string
  actor: string
  descripcion: string
}

const actorIcons: Record<string, string> = {
  Administrador: '👨‍💼',
  Parrillero: '👨‍🍳',
}

export default function FeatureCards({ features }: { features: Feature[] }) {
  const actorGroups = features.reduce(
    (acc, f) => {
      if (!acc[f.actor]) acc[f.actor] = []
      acc[f.actor].push(f)
      return acc
    },
    {} as Record<string, Feature[]>
  )

  return (
    <div className="features-container">
      {Object.entries(actorGroups).map(([actor, items]) => (
        <div key={actor} className="actor-section">
          <div className="actor-header">
            <span className="actor-icon">{actorIcons[actor] || '👤'}</span>
            <h3>{actor}</h3>
            <span className="count">{items.length}</span>
          </div>
          <div className="cards-grid">
            {items.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="card-header">
                  <span className="nivel2">{feature.nivel2}</span>
                </div>
                <h4>{feature.nivel3}</h4>
                <p>{feature.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
