import React, { useState } from 'react'
import Modal from './Modal'

type Product = {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  cost: number
  supplier: string
}

export default function InventoryTable() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Carne Vacuno', category: 'Carnes', stock: 850, minStock: 500, cost: 4500, supplier: 'Ganadería Del Sur' },
    { id: '2', name: 'Carbón Madera', category: 'Combustible', stock: 120, minStock: 500, cost: 2800, supplier: 'Carbones Premium' },
    { id: '3', name: 'Pollo', category: 'Carnes', stock: 560, minStock: 300, cost: 3200, supplier: 'Avícola Central' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    category: '',
    stock: 0,
    minStock: 0,
    cost: 0,
    supplier: '',
  })

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        stock: product.stock,
        minStock: product.minStock,
        cost: product.cost,
        supplier: product.supplier,
      })
      setEditingId(product.id)
    } else {
      setForm({ name: '', category: '', stock: 0, minStock: 0, cost: 0, supplier: '' })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name || !form.category || !form.supplier) {
      alert('Complete todos los campos')
      return
    }

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...form } : p))
    } else {
      setProducts([...products, { id: Date.now().toString(), ...form }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setProducts(products.filter(p => p.id !== deleteId))
    }
    setShowDeleteConfirm(false)
    setDeleteId(null)
  }

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Gestión de Inventario</h3>
        <button className="btn-add" onClick={() => handleOpenForm()}>+ Nuevo Producto</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Costo Unitario</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className={p.stock < p.minStock ? 'row-alert' : ''}>
              <td><strong>{p.name}</strong></td>
              <td>{p.category}</td>
              <td>
                <span className={`badge ${p.stock < p.minStock ? 'badge-danger' : 'badge-success'}`}>
                  {p.stock}
                </span>
              </td>
              <td>{p.minStock}</td>
              <td>${p.cost.toLocaleString()}</td>
              <td>{p.supplier}</td>
              <td className="actions">
                <button className="btn-icon edit" onClick={() => handleOpenForm(p)}>✎</button>
                <button className="btn-icon delete" onClick={() => handleDelete(p.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} title={editingId ? 'Editar Producto' : 'Nuevo Producto'} onClose={() => setShowModal(false)}>
        <form className="form-modal" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre del Producto</label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                <option value="">Seleccionar</option>
                <option value="Carnes">Carnes</option>
                <option value="Combustible">Combustible</option>
                <option value="Condimentos">Condimentos</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stock Actual</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({...form, stock: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label>Stock Mínimo</label>
              <input type="number" value={form.minStock} onChange={(e) => setForm({...form, minStock: Number(e.target.value)})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Costo Unitario</label>
              <input type="number" value={form.cost} onChange={(e) => setForm({...form, cost: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label>Proveedor</label>
              <input type="text" value={form.supplier} onChange={(e) => setForm({...form, supplier: e.target.value})} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
            <button type="submit" className="btn-save">Guardar</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showDeleteConfirm} title="Confirmar Eliminación" onClose={() => setShowDeleteConfirm(false)}>
        <div className="confirm-dialog">
          <p>¿Estás seguro de que deseas eliminar este producto?</p>
          <div className="confirm-actions">
            <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
            <button className="btn-delete" onClick={confirmDelete}>Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
