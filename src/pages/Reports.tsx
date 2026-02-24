import React from 'react'
import FeatureTable from '../components/FeatureTable'
import Hero from '../components/Hero'

export default function Reports({ features }: { features: any[] }) {
  const filtered = features.filter((f) => f.nivel2 === 'Reportes')
  return (
    <div>
      <Hero
        title="Reportes & Análisis"
        subtitle="Dashboards y KPIs para decisiones operativas y financieras." 
        icon="📊"
        ctaLabel="Generar Reporte"
        onCta={() => alert('Generar reporte (placeholder)')}
      />
      <FeatureTable features={filtered} title="Módulos de Reportes" />
    </div>
  )
}
