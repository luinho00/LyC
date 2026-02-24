import React, { useState } from 'react'
import Modal from './Modal'

type Order = {
  id: string
  orderNum: string
  dishes: string
  quantity: number
  cookTime: number
  status: 'pending' | 'cooking' | 'ready' | 'served'
  chef: string
  startTime: string
}

export default function KitchenTable() {
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', orderNum: '#4521', dishes: 'Costillas BBQ x2', quantity: 2, cookTime: 22, status: 'cooking', chef: 'Juan García', startTime: '11:45' },
    { id: '2', orderNum: '#4522', dishes: 'Carne Roja x3', quantity: 3, cookTime: 18, status: 'ready', chef: 'Juan García', startTime: '11:50' },
    { id: '3', orderNum: '#4523', dishes: 'Pollo Grillado x1', quantity: 1, cookTime: 14, status: 'pending', chef: 'Miguel López', startTime: '12:00' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    orderNum: '',
    dishes: '',
    quantity: 1,
    cookTime: 15,
    status: 'pending' as const,
    chef: '',
    startTime: '',
  })

  const handleOpenForm = (order?: Order) => {
    if (order) {
      setForm({
        orderNum: order.orderNum,
        dishes: order.dishes,
        quantity: order.quantity,
        cookTime: order.cookTime,
        status: order.status,
        chef: order.chef,
        startTime: order.startTime,
      })
      setEditingId(order.id)
    } else {
      setForm({ orderNum: '', dishes: '', quantity: 1, cookTime: 15, status: 'pending', chef: '', startTime: '' })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.orderNum || !form.dishes || !form.chef) {
      alert('Complete todos los campos')
      return
    }

    if (editingId) {
      setOrders(orders.map(o => o.id === editingId ? { ...o, ...form } : o))
    } else {
      setOrders([...orders, { id: Date.now().toString(), ...form }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setOrders(orders.filter(o => o.id !== id))
  }

  const statusColors = {
    pending: 'badge-warning',
    cooking: 'badge-info',
    ready: 'badge-success',
    served: 'badge-gray',
  }

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Gestión de Comandas</h3>
        <button className="btn-add" onClick={() => handleOpenForm()}>+ Nueva Comanda</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>N° Comanda</th>
            <th>Platos</th>
            <th>Cant.</th>
            <th>Tiempo Est.</th>
            <th>Estado</th>
            <th>Parrillero</th>
            <th>Inicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td><strong>{o.orderNum}</strong></td>
              <td>{o.dishes}</td>
              <td>{o.quantity}</td>
              <td>{o.cookTime} min</td>
              <td><span className={`badge ${statusColors[o.status]}`}>{o.status.toUpperCase()}</span></td>
              <td>{o.chef}</td>
              <td>{o.startTime}</td>
              <td className="actions">
                <button className="btn-icon edit" onClick={() => handleOpenForm(o)}>✎</button>
                <button className="btn-icon delete" onClick={() => handleDelete(o.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} title={editingId ? 'Editar Comanda' : 'Nueva Comanda'} onClose={() => setShowModal(false)}>
        <form className="form-modal" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
          <div className="form-row">
            <div className="form-group">
              <label>N° Comanda</label>
              <input type="text" value={form.orderNum} onChange={(e) => setForm({...form, orderNum: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Parrillero</label>
              <select value={form.chef} onChange={(e) => setForm({...form, chef: e.target.value})}>
                <option value="">Seleccionar</option>
                <option value="Juan García">Juan García</option>
                <option value="Miguel López">Miguel López</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Platos</label>
              <input type="text" value={form.dishes} onChange={(e) => setForm({...form, dishes: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cantidad</label>
              <input type="number" value={form.quantity} onChange={(e) => setForm({...form, quantity: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label>Tiempo Est. (min)</label>
              <input type="number" value={form.cookTime} onChange={(e) => setForm({...form, cookTime: Number(e.target.value)})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Estado</label>
              <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value as any})}>
                <option value="pending">Pendiente</option>
                <option value="cooking">Cocinando</option>
                <option value="ready">Listo</option>
                <option value="served">Servido</option>
              </select>
            </div>
            <div className="form-group">
              <label>Hora Inicio</label>
              <input type="time" value={form.startTime} onChange={(e) => setForm({...form, startTime: e.target.value})} />
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
