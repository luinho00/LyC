import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ChartBar({
  data,
  title,
}: {
  data: Array<{ name: string; value: number }>
  title?: string
}) {
  return (
    <div className="chart-container">
      {title && <h4>{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip contentStyle={{ backgroundColor: '#0b1220', border: '1px solid rgba(124,92,255,0.3)' }} />
          <Legend />
          <Bar dataKey="value" fill="#7c5cff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
