import React, { useState } from 'react'
import Modal from './Modal'

type Transaction = {
  id: string
  date: string
  type: 'ingreso' | 'egreso'
  concept: string
  amount: number
  category: string
  notes: string
}

export default function ReportsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2026-02-24', type: 'ingreso', concept: 'Ventas - Almuerzo', amount: 12500, category: 'Ventas', notes: 'Viernes lunes 24' },
    { id: '2', date: '2026-02-24', type: 'egreso', concept: 'Compra Carbón', amount: 2800, category: 'Insumos', notes: 'Carbones Premium' },
    { id: '3', date: '2026-02-23', type: 'ingreso', concept: 'Ventas - Cena', amount: 15800, category: 'Ventas', notes: 'Jueves 23' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    date: '',
    type: 'ingreso' as const,
    concept: '',
    amount: 0,
    category: '',
    notes: '',
  })

  const handleOpenForm = (transaction?: Transaction) => {
    if (transaction) {
      setForm({
        date: transaction.date,
        type: transaction.type,
        concept: transaction.concept,
        amount: transaction.amount,
        category: transaction.category,
        notes: transaction.notes,
      })
      setEditingId(transaction.id)
    } else {
      setForm({ date: new Date().toISOString().split('T')[0], type: 'ingreso', concept: '', amount: 0, category: '', notes: '' })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.date || !form.concept || !form.category || form.amount === 0) {
      alert('Complete todos los campos')
      return
    }

    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? { ...t, ...form } : t))
    } else {
      setTransactions([...transactions, { id: Date.now().toString(), ...form }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const totalIncome = transactions.filter(t => t.type === 'ingreso').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'egreso').reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Reportes & Transacciones</h3>
        <button className="btn-add" onClick={() => handleOpenForm()}>+ Nueva Transacción</button>
      </div>

      <div className="summary-cards">
        <div className="summary-card income">
          <p>Ingresos</p>
          <h3>${totalIncome.toLocaleString()}</h3>
        </div>
        <div className="summary-card expense">
          <p>Egresos</p>
          <h3>${totalExpense.toLocaleString()}</h3>
        </div>
        <div className="summary-card balance">
          <p>Balance</p>
          <h3 className={balance >= 0 ? 'positive' : 'negative'}>
            ${balance.toLocaleString()}
          </h3>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Concepto</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className={t.type === 'ingreso' ? 'row-income' : 'row-expense'}>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${t.type === 'ingreso' ? 'badge-success' : 'badge-danger'}`}>
                  {t.type === 'ingreso' ? 'INGRESO' : 'EGRESO'}
                </span>
              </td>
              <td><strong>{t.concept}</strong></td>
              <td>{t.category}</td>
              <td className={`amount ${t.type === 'ingreso' ? 'income' : 'expense'}`}>
                {t.type === 'ingreso' ? '+' : '-'}${t.amount.toLocaleString()}
              </td>
              <td>{t.notes}</td>
              <td className="actions">
                <button className="btn-icon edit" onClick={() => handleOpenForm(t)}>✎</button>
                <button className="btn-icon delete" onClick={() => handleDelete(t.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} title={editingId ? 'Editar Transacción' : 'Nueva Transacción'} onClose={() => setShowModal(false)}>
        <form className="form-modal" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha</label>
              <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value as any})}>
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Concepto</label>
              <input type="text" value={form.concept} onChange={(e) => setForm({...form, concept: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                <option value="">Seleccionar</option>
                <option value="Ventas">Ventas</option>
                <option value="Insumos">Insumos</option>
                <option value="Servicios">Servicios</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div className="form-group">
              <label>Monto</label>
              <input type="number" value={form.amount} onChange={(e) => setForm({...form, amount: Number(e.target.value)})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Notas</label>
              <textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} rows={3}></textarea>
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
