import React, { useState } from 'react'
import Modal from './Modal'

type Campaign = {
  id: string
  name: string
  platform: string
  type: string
  startDate: string
  endDate: string
  budget: number
  reach: number
  engagement: number
  status: 'active' | 'paused' | 'completed'
}

export default function SocialMediaTable() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Food Porn - Costillas', platform: 'Instagram', type: 'Foto', startDate: '2026-02-20', endDate: '2026-03-20', budget: 1500, reach: 12500, engagement: 856, status: 'active' },
    { id: '2', name: 'Promo Viernes BBQ', platform: 'Facebook', type: 'Video', startDate: '2026-02-24', endDate: '2026-02-28', budget: 2000, reach: 25000, engagement: 1234, status: 'active' },
    { id: '3', name: 'Engagement VIP', platform: 'WhatsApp', type: 'Mensaje', startDate: '2026-02-01', endDate: '2026-02-28', budget: 0, reach: 450, engagement: 245, status: 'completed' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState<Campaign>({
    id: '',
    name: '',
    platform: '',
    type: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    budget: 0,
    reach: 0,
    engagement: 0,
    status: 'active',
  })

  const handleOpenForm = (campaign?: Campaign) => {
    if (campaign) {
      setForm(campaign)
      setEditingId(campaign.id)
    } else {
      setForm({
        id: '',
        name: '',
        platform: '',
        type: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        budget: 0,
        reach: 0,
        engagement: 0,
        status: 'active',
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name || !form.platform || !form.type) {
      alert('Complete todos los campos')
      return
    }

    if (editingId) {
      setCampaigns(campaigns.map(c => c.id === editingId ? { ...c, ...form } : c))
    } else {
      const newId = Date.now().toString()
      setCampaigns([...campaigns, { ...form, id: newId }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id))
  }

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Campañas de Redes Sociales</h3>
        <button className="btn-add" onClick={() => handleOpenForm()}>+ Nueva Campaña</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Plataforma</th>
            <th>Tipo</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Presupuesto</th>
            <th>Alcance</th>
            <th>Engagement</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(c => (
            <tr key={c.id}>
              <td><strong>{c.name}</strong></td>
              <td>{c.platform}</td>
              <td>{c.type}</td>
              <td>{new Date(c.startDate).toLocaleDateString()}</td>
              <td>{new Date(c.endDate).toLocaleDateString()}</td>
              <td>${c.budget.toLocaleString()}</td>
              <td>{c.reach.toLocaleString()}</td>
              <td>{c.engagement}</td>
              <td><span className={`badge badge-${c.status === 'active' ? 'success' : c.status === 'paused' ? 'warning' : 'gray'}`}>{c.status.toUpperCase()}</span></td>
              <td className="actions">
                <button className="btn-icon edit" onClick={() => handleOpenForm(c)}>✎</button>
                <button className="btn-icon delete" onClick={() => handleDelete(c.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} title={editingId ? 'Editar Campaña' : 'Nueva Campaña'} onClose={() => setShowModal(false)}>
        <form className="form-modal" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
          <div className="form-row">
            <div className="form-group full">
              <label>Nombre de Campaña</label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Plataforma</label>
              <select value={form.platform} onChange={(e) => setForm({...form, platform: e.target.value})}>
                <option value="">Seleccionar</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="TikTok">TikTok</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
                <option value="">Seleccionar</option>
                <option value="Foto">Foto</option>
                <option value="Video">Video</option>
                <option value="Carrusel">Carrusel</option>
                <option value="Mensaje">Mensaje</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha Inicio</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Fecha Fin</label>
              <input type="date" value={form.endDate} onChange={(e) => setForm({...form, endDate: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Presupuesto</label>
              <input type="number" value={form.budget} onChange={(e) => setForm({...form, budget: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label>Alcance Estimado</label>
              <input type="number" value={form.reach} onChange={(e) => setForm({...form, reach: Number(e.target.value)})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Engagement</label>
              <input type="number" value={form.engagement} onChange={(e) => setForm({...form, engagement: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value as 'active' | 'paused' | 'completed'})}>
                <option value="active">Activo</option>
                <option value="paused">Pausado</option>
                <option value="completed">Completado</option>
              </select>
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
