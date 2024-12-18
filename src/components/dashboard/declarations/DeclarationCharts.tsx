import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

interface ConformityData {
  name: string;
  value: number;
}

interface EvolutionData {
  date: string;
  value: number;
}

interface DistributionData {
  name: string;
  value: number;
}

interface DeclarationChartsProps {
  conformityData: ConformityData[];
  evolutionData: EvolutionData[];
  distributionData: DistributionData[];
}

const COLORS = ['#0C6E81', '#10B981', '#6366F1', '#F59E0B'];

export function DeclarationCharts({ conformityData, evolutionData, distributionData }: DeclarationChartsProps) {
  return (
    <>
      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Conformity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>État de Conformité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conformityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0C6E81" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Evolution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution Mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0C6E81" dot={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Répartition des Déclarations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Déclarations Publiques', value: 6 },
                    { name: 'Déclarations Privées', value: 4 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Déclarations Publiques', value: 6 },
                    { name: 'Déclarations Privées', value: 4 }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
