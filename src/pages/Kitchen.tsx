import React from 'react'
import FeatureTable from '../components/FeatureTable'
import Hero from '../components/Hero'

export default function Kitchen({ features }: { features: any[] }) {
  const filtered = features.filter((f) => f.nivel2 === 'Cocina')
  return (
    <div>
      <Hero
        title="Cocina - Operaciones"
        subtitle="Panel en tiempo real para parrilleros y personal de cocina."
        icon="🔥"
        ctaLabel="Ver Comandas"
        onCta={() => alert('Ir a comandas (placeholder)')}
      />
      <FeatureTable features={filtered} title="Módulos de Cocina" />
    </div>
  )
}
