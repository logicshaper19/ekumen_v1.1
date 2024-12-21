import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Building2, Leaf, TrendingUp, AlertCircle, Search, ArrowRight } from 'lucide-react';
import { AnalyticsCard } from "@/components/ui/analytics-card";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

// Mock data for the dashboard
const mockData = {
  overview: {
    totalFarms: 150,
    totalEmissions: 45000,
    avgEmissionPerFarm: 300,
    financedFarmsPercentage: 35,
    totalEmissionsPercentage: 28,
    trends: {
      farms: { value: '+5', trend: 'up' as const },
      emissions: { value: '-2%', trend: 'down' as const },
      average: { value: '-3%', trend: 'down' as const }
    }
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
    { 
      name: 'Ferme Durand',
      emissions: 800,
      type: 'Élevage',
      region: 'Bretagne',
      location: 'Rennes',
      size: 150,
      loans: {
        total: 450000,
        count: 2,
        types: ['Équipement', 'Foncier']
      },
      emissionTrend: [
        { year: '2021', emissions: 750 },
        { year: '2022', emissions: 780 },
        { year: '2023', emissions: 800 }
      ]
    },
    { 
      name: 'Exploitation Martin',
      emissions: 750,
      type: 'Grandes cultures',
      region: 'Grand Est',
      location: 'Reims',
      size: 200,
      loans: {
        total: 600000,
        count: 3,
        types: ['Équipement', 'Foncier', 'Trésorerie']
      },
      emissionTrend: [
        { year: '2021', emissions: 780 },
        { year: '2022', emissions: 760 },
        { year: '2023', emissions: 750 }
      ]
    },
    { 
      name: 'GAEC des Plaines',
      emissions: 700,
      type: 'Élevage',
      region: 'Nouvelle-Aquitaine',
      location: 'Bordeaux',
      size: 180,
      loans: {
        total: 520000,
        count: 2,
        types: ['Équipement', 'Développement']
      },
      emissionTrend: [
        { year: '2021', emissions: 650 },
        { year: '2022', emissions: 680 },
        { year: '2023', emissions: 700 }
      ]
    },
    { 
      name: 'EARL du Soleil',
      emissions: 650,
      type: 'Grandes cultures',
      region: 'Occitanie',
      location: 'Toulouse',
      size: 160,
      loans: {
        total: 480000,
        count: 2,
        types: ['Foncier', 'Modernisation']
      },
      emissionTrend: [
        { year: '2021', emissions: 690 },
        { year: '2022', emissions: 670 },
        { year: '2023', emissions: 650 }
      ]
    }
  ]
};

export function ESGDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmitters = mockData.highEmitters.filter(emitter => 
    emitter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emitter.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emitter.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emitter.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard ESG</h1>
      
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Fermes Financées"
          value={mockData.overview.totalFarms.toString()}
          description={`${mockData.overview.financedFarmsPercentage}% du portefeuille total`}
          icon={Building2}
          change={mockData.overview.trends.farms.value}
          trend={mockData.overview.trends.farms.trend}
        />

        <AnalyticsCard
          title="Émissions Totales"
          value={`${mockData.overview.totalEmissions} tCO2e`}
          description={`${mockData.overview.totalEmissionsPercentage}% des émissions Scope 3`}
          icon={Leaf}
          change={mockData.overview.trends.emissions.value}
          trend={mockData.overview.trends.emissions.trend}
        />

        <AnalyticsCard
          title="Moyenne par Ferme"
          value={`${mockData.overview.avgEmissionPerFarm} tCO2e`}
          description="Par exploitation financée"
          icon={TrendingUp}
          change={mockData.overview.trends.average.value}
          trend={mockData.overview.trends.average.trend}
        />
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
                  <Bar dataKey="emissions" fill="#005E5D" name="Émissions (tCO2e)" />
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
                  <Bar dataKey="emissions" fill="#005E5D" name="Émissions (tCO2e)" />
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
                  stroke="#005E5D" 
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
          <div>
            <CardTitle>10 Principaux Émetteurs</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Exploitations avec les plus fortes émissions</p>
          </div>
          <Link 
            to="/esg-dashboard/emitters" 
            className="text-sm text-[#005E5D] hover:underline flex items-center gap-1"
          >
            Voir la liste complète
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.highEmitters.map((emitter, index) => (
              <div key={index} className="flex items-start gap-6 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-grow space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{emitter.name}</h3>
                      <p className="text-sm text-muted-foreground">{emitter.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-[#005E5D]">{emitter.emissions} tCO2e</p>
                      <p className="text-sm text-muted-foreground">Émissions annuelles</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Localisation</p>
                      <p className="font-medium">{emitter.location}, {emitter.region}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Surface</p>
                      <p className="font-medium">{emitter.size} hectares</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">Financement</p>
                    <p className="font-medium">
                      {emitter.loans.count} prêts - {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(emitter.loans.total)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {emitter.loans.types.join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="w-1/3">
                  <p className="text-sm text-muted-foreground mb-2">Évolution des émissions</p>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={emitter.emissionTrend}
                        margin={{ top: 5, right: 5, bottom: 20, left: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="year" 
                          tick={{ fontSize: 11 }}
                          axisLine={true}
                          tickLine={true}
                          label={{ 
                            value: 'Année', 
                            position: 'bottom',
                            offset: 10,
                            fontSize: 11
                          }}
                        />
                        <YAxis 
                          tick={{ fontSize: 11 }}
                          axisLine={true}
                          tickLine={true}
                          label={{ 
                            value: 'tCO2e', 
                            angle: -90, 
                            position: 'left',
                            offset: 0,
                            fontSize: 11
                          }}
                          width={35}
                        />
                        <Tooltip 
                          contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                          formatter={(value) => [`${value} tCO2e`, 'Émissions']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="emissions" 
                          stroke="#005E5D" 
                          strokeWidth={2}
                          dot={true}
                          activeDot={{ r: 4, fill: "#005E5D" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
