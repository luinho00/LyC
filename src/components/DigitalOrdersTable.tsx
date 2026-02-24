import React, { useState } from 'react'
import Modal from './Modal'

type DigitalOrder = {
  id: string
  orderNum: string
  channel: string
  customerName: string
  items: string
  totalAmount: number
  deliveryTime: string
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  createdAt: string
}

export default function DigitalOrdersTable() {
  const [orders, setOrders] = useState<DigitalOrder[]>([
    { id: '1', orderNum: 'DO-001', channel: 'App', customerName: 'Juan García', items: '2x Costillar, 1x Sopa', totalAmount: 450, deliveryTime: '45 min', status: 'confirmed', createdAt: '2026-02-24' },
    { id: '2', orderNum: 'DO-002', channel: 'Web', customerName: 'María López', items: '1x Arrachera, 1x Bebida', totalAmount: 320, deliveryTime: '60 min', status: 'preparing', createdAt: '2026-02-24' },
    { id: '3', orderNum: 'DO-003', channel: 'Phone', customerName: 'Carlos Ruiz', items: '3x Taco Al Pastor, 1x Postre', totalAmount: 280, deliveryTime: '30 min', status: 'ready', createdAt: '2026-02-24' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState<Omit<DigitalOrder, 'id' | 'createdAt'>>({
    orderNum: '',
    channel: '',
    customerName: '',
    items: '',
    totalAmount: 0,
    deliveryTime: '',
    status: 'pending',
  })

  const handleOpenForm = (order?: DigitalOrder) => {
    if (order) {
      setForm({
        orderNum: order.orderNum,
        channel: order.channel,
        customerName: order.customerName,
        items: order.items,
        totalAmount: order.totalAmount,
        deliveryTime: order.deliveryTime,
        status: order.status,
      })
      setEditingId(order.id)
    } else {
      setForm({
        orderNum: `DO-${String(orders.length + 1).padStart(3, '0')}`,
        channel: '',
        customerName: '',
        items: '',
        totalAmount: 0,
        deliveryTime: '',
        status: 'pending',
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.orderNum || !form.channel || !form.customerName || !form.items || !form.deliveryTime) {
      alert('Complete todos los campos')
      return
    }

    if (editingId) {
      setOrders(orders.map(o => o.id === editingId ? { ...o, ...form, createdAt: orders.find(x => x.id === editingId)?.createdAt || '' } : o))
    } else {
      setOrders([...orders, { id: Date.now().toString(), ...form, createdAt: new Date().toISOString().split('T')[0] }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setOrders(orders.filter(o => o.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'warning'
      case 'confirmed': return 'info'
      case 'preparing': return 'warning'
      case 'ready': return 'success'
      case 'delivered': return 'success'
      case 'cancelled': return 'danger'
      default: return 'gray'
    }
  }

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Pedidos Canales Digitales</h3>
        <button className="btn-add" onClick={() => handleOpenForm()}>+ Nuevo Pedido</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Pedido #</th>
            <th>Canal</th>
            <th>Cliente</th>
            <th>Artículos</th>
            <th>Monto</th>
            <th>Entrega</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td><strong>{o.orderNum}</strong></td>
              <td><span className="badge badge-info">{o.channel}</span></td>
              <td>{o.customerName}</td>
              <td>{o.items}</td>
              <td className="amount">${o.totalAmount.toLocaleString()}</td>
              <td>{o.deliveryTime}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td><span className={`badge badge-${getStatusColor(o.status)}`}>{o.status.toUpperCase()}</span></td>
              <td className="actions">
                <button className="btn-icon edit" onClick={() => handleOpenForm(o)}>✎</button>
                <button className="btn-icon delete" onClick={() => handleDelete(o.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} title={editingId ? 'Editar Pedido' : 'Nuevo Pedido'} onClose={() => setShowModal(false)}>
        <form className="form-modal" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
          <div className="form-row">
            <div className="form-group">
              <label>Número de Pedido</label>
              <input type="text" value={form.orderNum} onChange={(e) => setForm({...form, orderNum: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Canal</label>
              <select value={form.channel} onChange={(e) => setForm({...form, channel: e.target.value})}>
                <option value="">Seleccionar</option>
                <option value="App">App</option>
                <option value="Web">Web</option>
                <option value="Phone">Teléfono</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Nombre del Cliente</label>
              <input type="text" value={form.customerName} onChange={(e) => setForm({...form, customerName: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Artículos</label>
              <textarea value={form.items} onChange={(e) => setForm({...form, items: e.target.value})} rows={3}></textarea>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Monto Total</label>
              <input type="number" value={form.totalAmount} onChange={(e) => setForm({...form, totalAmount: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label>Tiempo Entrega</label>
              <input type="text" placeholder="ej: 45 min" value={form.deliveryTime} onChange={(e) => setForm({...form, deliveryTime: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Estado</label>
              <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value as 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'})}>
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmado</option>
                <option value="preparing">Preparando</option>
                <option value="ready">Listo</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
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
