import React from 'react'
import FeatureTable from '../components/FeatureTable'
import Hero from '../components/Hero'

export default function Inventory({ features }: { features: any[] }) {
  const filtered = features.filter((f) => f.nivel2 === 'Inventario')
  return (
    <div>
      <Hero
        title="Inventario"
        subtitle="Control de insumos, costos y alertas para mantener operación continua."
        icon="📦"
        ctaLabel="Nuevo Registro"
        onCta={() => alert('Crear nuevo registro (placeholder)')}
      />
      <FeatureTable features={filtered} title="Módulos de Inventario" />
    </div>
  )
}
