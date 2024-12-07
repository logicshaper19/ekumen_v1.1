import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', count: 3 },
  { month: 'Fév', count: 5 },
  { month: 'Mar', count: 8 },
  { month: 'Avr', count: 4 },
  { month: 'Mai', count: 6 },
  { month: 'Juin', count: 7 },
  { month: 'Juil', count: 3 },
  { month: 'Aoû', count: 4 },
  { month: 'Sep', count: 6 },
  { month: 'Oct', count: 5 },
  { month: 'Nov', count: 4 },
  { month: 'Déc', count: 3 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm">{payload[0].value} déclarations</p>
      </div>
    );
  }
  return null;
};

export function FilingRequirementsChart() {
  // Add fill color based on index
  const data = monthlyData.map((item, index) => ({
    ...item,
    fill: index % 2 === 0 ? '#005E5D' : '#FFA69E'
  }));

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Conformité par mois</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis 
              dataKey="month"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              domain={[0, 10]}
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            <Bar 
              dataKey="count"
              fill="#005E5D"
              radius={[4, 4, 0, 0]}
              fillOpacity={1}
              getFill={(d) => d.fill}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
