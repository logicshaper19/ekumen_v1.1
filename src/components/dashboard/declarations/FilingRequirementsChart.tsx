import React from 'react';
import { Card } from '@/components/ui/card';

interface MonthlyFiling {
  month: string;
  count: number;
}

const monthlyData: MonthlyFiling[] = [
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

const maxCount = Math.max(...monthlyData.map(d => d.count));

export function FilingRequirementsChart() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Déclarations par Mois</h3>
      <div className="flex items-end space-x-2 h-[150px]">
        {monthlyData.map((data) => (
          <div key={data.month} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-blue-500 rounded-t"
              style={{ 
                height: `${(data.count / maxCount) * 120}px`,
                backgroundColor: 'hsl(var(--primary))'
              }}
            />
            <div className="mt-2 text-xs rotate-45 origin-left translate-y-4">
              {data.month}
            </div>
            <div className="mt-1 text-xs font-medium absolute -top-5">
              {data.count}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
