import React from 'react'

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
}: {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>
  )
}
