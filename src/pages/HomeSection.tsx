import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function HomeSection() {
  // Datos de Inventario
  const inventoryData = [
    { category: 'Carnes', value: 1410 },
    { category: 'Combustible', value: 120 },
    { category: 'Bebidas', value: 450 },
    { category: 'Salsas', value: 220 },
  ]

  // Datos de Órdenes
  const ordersData = [
    { status: 'Pendiente', count: 5 },
    { status: 'Cocinando', count: 8 },
    { status: 'Listo', count: 12 },
    { status: 'Servido', count: 24 },
  ]

  // Datos de Clientes
  const clientsData = [
    { segment: 'VIP', count: 15 },
    { segment: 'Regular', count: 42 },
    { segment: 'Ocasional', count: 28 },
  ]

  // Datos de Transacciones
  const transactionsData = [
    { type: 'Ingresos', amount: 45000 },
    { type: 'Egresos', amount: 12500 },
  ]

  // Datos de Campañas
  const campaignsData = [
    { platform: 'Instagram', campaigns: 3 },
    { platform: 'Facebook', campaigns: 2 },
    { platform: 'TikTok', campaigns: 1 },
    { platform: 'WhatsApp', campaigns: 2 },
  ]

  // Datos de Pedidos Digitales
  const ordersChannelData = [
    { channel: 'App', orders: 12 },
    { channel: 'Web', orders: 8 },
    { channel: 'Phone', orders: 5 },
  ]

  const color = '#7c5cff'

  return (
    <div className="home-section">
      <div className="home-header">
        <h2>📊 Dashboard de Estadísticas</h2>
        <p>Resumen general de todas las operaciones</p>
      </div>

      <div className="charts-grid">
        {/* Inventario */}
        <div className="chart-card">
          <h3>📦 Stock por Categoría</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="#9aa6b2" />
              <YAxis stroke="#9aa6b2" />
              <Tooltip contentStyle={{ background: '#0b1220', border: `1px solid ${color}` }} />
              <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Órdenes */}
        <div className="chart-card">
          <h3>🔥 Órdenes por Estado</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ordersData} dataKey="count" cx="50%" cy="50%" outerRadius={80} label>
                <Cell fill={color} />
              </Pie>
              <Tooltip contentStyle={{ background: '#0b1220', border: `1px solid ${color}` }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Clientes */}
        <div className="chart-card">
          <h3>🤝 Clientes por Segmento</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={clientsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="segment" stroke="#9aa6b2" />
              <YAxis stroke="#9aa6b2" />
              <Tooltip contentStyle={{ background: '#0b1220', border: `1px solid ${color}` }} />
              <Bar dataKey="count" fill={color} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transacciones */}
        <div className="chart-card">
          <h3>💰 Ingresos vs Egresos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={transactionsData} dataKey="amount" cx="50%" cy="50%" outerRadius={80} label>
                <Cell fill={color} />
              </Pie>
              <Tooltip contentStyle={{ background: '#0b1220', border: `1px solid ${color}` }} formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Campañas */}
        <div className="chart-card">
          <h3>📱 Campañas por Plataforma</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={campaignsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="platform" stroke="#9aa6b2" />
              <YAxis stroke="#9aa6b2" />
              <Tooltip contentStyle={{ background: '#0b1220', border: `1px solid ${color}` }} />
              <Bar dataKey="campaigns" fill={color} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pedidos Digitales */}
        <div className="chart-card">
          <h3>🛒 Pedidos por Canal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ordersChannelData} dataKey="orders" cx="50%" cy="50%" outerRadius={80} label>
                <Cell fill={color} />
              </Pie>
              <Tooltip contentStyle={{ background: '#0b1220', border: `1px solid ${color}` }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
