import React from 'react'

export default function Hero({
  title,
  subtitle,
  icon,
  ctaLabel,
  onCta,
}: {
  title: string
  subtitle?: string
  icon?: string
  ctaLabel?: string
  onCta?: () => void
}) {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-icon">{icon ?? '🏢'}</div>
        <div>
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-sub">{subtitle}</p>}
        </div>
      </div>
      {ctaLabel && (
        <div className="hero-cta">
          <button className="btn-primary" onClick={onCta}>{ctaLabel}</button>
        </div>
      )}
    </section>
  )
}
