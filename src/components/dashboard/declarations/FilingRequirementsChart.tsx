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
  { month: 'Déc', count: 3 }
].map((item, index) => ({
  ...item,
  fill: index % 2 === 0 ? '#005E5D' : '#FF8B7E'
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const count = payload[0].value;
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        <p className="text-sm">{count} déclarations</p>
      </div>
    );
  }
  return null;
};

export function FilingRequirementsChart() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Déclarations par mois</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
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
              radius={[4, 4, 0, 0]}
              getFill={(d) => d.fill}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
