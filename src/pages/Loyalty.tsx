import React from 'react'
import FeatureTable from '../components/FeatureTable'
import Hero from '../components/Hero'

export default function Loyalty({ features }: { features: any[] }) {
  const filtered = features.filter((f) => f.nivel2 === 'Fidelización')
  return (
    <div>
      <Hero
        title="Fidelización"
        subtitle="Gestión de clientes y campañas segmentadas para retención." 
        icon="🤝"
        ctaLabel="Crear Campaña"
        onCta={() => alert('Nueva campaña (placeholder)')}
      />
      <FeatureTable features={filtered} title="Módulos de Fidelización" />
    </div>
  )
}
