import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#7c5cff', '#ff8a00', '#ff3cac', '#00d4ff', '#ff6b6b', '#4ecdc4']

export default function ChartPie({
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#7c5cff"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#0b1220', border: '1px solid rgba(124,92,255,0.3)' }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
