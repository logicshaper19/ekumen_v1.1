import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Building2, Leaf, TrendingUp, AlertCircle } from 'lucide-react';

// Mock data for the dashboard
const mockData = {
  overview: {
    totalFarms: 150,
    totalEmissions: 45000,
    avgEmissionPerFarm: 300,
    financedFarmsPercentage: 35,
    totalEmissionsPercentage: 28
  },
  emissionsByFarmType: [
    { type: 'Élevage', emissions: 20000 },
    { type: 'Grandes cultures', emissions: 15000 },
    { type: 'Maraîchage', emissions: 5000 },
    { type: 'Viticulture', emissions: 5000 }
  ],
  emissionsByRegion: [
    { region: 'Bretagne', emissions: 12000 },
    { region: 'Nouvelle-Aquitaine', emissions: 10000 },
    { region: 'Occitanie', emissions: 8000 },
    { region: 'Grand Est', emissions: 15000 }
  ],
  emissionsTrend: [
    { year: '2020', emissions: 50000 },
    { year: '2021', emissions: 48000 },
    { year: '2022', emissions: 46000 },
    { year: '2023', emissions: 45000 },
    { year: '2024', emissions: 43000 }
  ],
  highEmitters: [
    { name: 'Ferme Durand', emissions: 800, type: 'Élevage' },
    { name: 'Exploitation Martin', emissions: 750, type: 'Grandes cultures' },
    { name: 'GAEC des Plaines', emissions: 700, type: 'Élevage' },
    { name: 'EARL du Soleil', emissions: 650, type: 'Grandes cultures' }
  ]
};

export function ESGDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard ESG</h1>
      
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fermes Financées</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalFarms}</div>
            <p className="text-xs text-muted-foreground">
              {mockData.overview.financedFarmsPercentage}% du portefeuille total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Émissions Totales</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalEmissions} tCO2e</div>
            <p className="text-xs text-muted-foreground">
              {mockData.overview.totalEmissionsPercentage}% des émissions Scope 3
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne par Ferme</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.avgEmissionPerFarm} tCO2e</div>
            <p className="text-xs text-muted-foreground">
              Par exploitation financée
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emissions Breakdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Émissions par Type d'Exploitation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.emissionsByFarmType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#10b981" name="Émissions (tCO2e)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Émissions par Région</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.emissionsByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#6366f1" name="Émissions (tCO2e)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Section */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des Émissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.emissionsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Émissions (tCO2e)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* High Emitters Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Principaux Émetteurs</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.highEmitters.map((emitter, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{emitter.name}</p>
                  <p className="text-sm text-muted-foreground">{emitter.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{emitter.emissions} tCO2e</p>
                  <p className="text-sm text-muted-foreground">Émissions annuelles</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
