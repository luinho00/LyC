import React, { useState } from 'react'
import Modal from './Modal'

type Client = {
  id: string
  name: string
  phone: string
  email: string
  segment: 'VIP' | 'Regular' | 'Ocasional'
  totalVisits: number
  favoriteDish: string
  joinDate: string
}

export default function LoyaltyTable() {
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Carlos López', phone: '+56912345678', email: 'carlos@email.com', segment: 'VIP', totalVisits: 45, favoriteDish: 'Costillas BBQ', joinDate: '2023-01-15' },
    { id: '2', name: 'María González', phone: '+56987654321', email: 'maria@email.com', segment: 'Regular', totalVisits: 12, favoriteDish: 'Carne Roja', joinDate: '2024-06-20' },
    { id: '3', name: 'Juan Rodríguez', phone: '+56912389456', email: 'juan@email.com', segment: 'Ocasional', totalVisits: 3, favoriteDish: 'Pollo Grillado', joinDate: '2024-10-01' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState<Omit<Client, 'id'>>({
    name: '',
    phone: '',
    email: '',
    segment: 'Regular',
    totalVisits: 0,
    favoriteDish: '',
    joinDate: '',
  })

  const handleOpenForm = (client?: Client) => {
    if (client) {
      setForm({
        name: client.name,
        phone: client.phone,
        email: client.email,
        segment: client.segment,
        totalVisits: client.totalVisits,
        favoriteDish: client.favoriteDish,
        joinDate: client.joinDate,
      })
      setEditingId(client.id)
    } else {
      setForm({ name: '', phone: '', email: '', segment: 'Regular', totalVisits: 0, favoriteDish: '', joinDate: '' })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name || !form.phone || !form.email) {
      alert('Complete todos los campos requeridos')
      return
    }

    if (editingId) {
      setClients(clients.map(c => c.id === editingId ? { ...c, ...form } : c))
    } else {
      setClients([...clients, { id: Date.now().toString(), ...form }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setClients(clients.filter(c => c.id !== id))
  }

  const segmentColors = {
    VIP: 'badge-danger',
    Regular: 'badge-success',
    Ocasional: 'badge-warning',
  }

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Gestión de Clientes</h3>
        <button className="btn-add" onClick={() => handleOpenForm()}>+ Nuevo Cliente</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Segmento</th>
            <th>Visitas</th>
            <th>Plato Favorito</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td><strong>{c.name}</strong></td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td><span className={`badge ${segmentColors[c.segment]}`}>{c.segment}</span></td>
              <td>{c.totalVisits}</td>
              <td>{c.favoriteDish}</td>
              <td>{new Date(c.joinDate).toLocaleDateString()}</td>
              <td className="actions">
                <button className="btn-icon edit" onClick={() => handleOpenForm(c)}>✎</button>
                <button className="btn-icon delete" onClick={() => handleDelete(c.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} title={editingId ? 'Editar Cliente' : 'Nuevo Cliente'} onClose={() => setShowModal(false)}>
        <form className="form-modal" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
          <div className="form-row">
            <div className="form-group full">
              <label>Nombre Completo</label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Segmento</label>
              <select value={form.segment} onChange={(e) => setForm({...form, segment: e.target.value as 'VIP' | 'Regular' | 'Ocasional'})}>
                <option value="VIP">VIP</option>
                <option value="Regular">Regular</option>
                <option value="Ocasional">Ocasional</option>
              </select>
            </div>
            <div className="form-group">
              <label>Visitas Totales</label>
              <input type="number" value={form.totalVisits} onChange={(e) => setForm({...form, totalVisits: Number(e.target.value)})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Plato Favorito</label>
              <input type="text" value={form.favoriteDish} onChange={(e) => setForm({...form, favoriteDish: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Fecha de Registro</label>
              <input type="date" value={form.joinDate} onChange={(e) => setForm({...form, joinDate: e.target.value})} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
            <button type="submit" className="btn-save">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
