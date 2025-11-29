"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 72 },
  { month: "Apr", value: 85 },
  { month: "May", value: 92 },
  { month: "Jun", value: 110 },
  { month: "Jul", value: 125 },
  { month: "Aug", value: 145 },
  { month: "Sep", value: 165 },
  { month: "Oct", value: 155 },
  { month: "Nov", value: 120 },
  { month: "Dec", value: 105 },
]

export function PlayerParticipation() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" stroke="#999" />
        <YAxis stroke="#999" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#dc2626" dot={false} strokeWidth={3} fill="#fee2e2" />
      </LineChart>
    </ResponsiveContainer>
  )
}
