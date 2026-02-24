import React from 'react'

type Feature = {
  nivel1: string
  nivel2: string
  nivel3: string
  actor: string
  descripcion: string
}

export default function FeatureTable({ features, title }: { features: Feature[]; title?: string }) {
  return (
    <div>
      <h2>{title ?? 'Features'}</h2>
      <table className="feature-table">
        <thead>
          <tr>
            <th>Nivel 1</th>
            <th>Nivel 2</th>
            <th>Nivel 3</th>
            <th>Actor Responsable</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i}>
              <td>{f.nivel1}</td>
              <td>{f.nivel2}</td>
              <td>{f.nivel3}</td>
              <td><span className="chip">{f.actor}</span></td>
              <td>{f.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
