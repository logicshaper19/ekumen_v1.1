import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Leaf, Droplets, CloudRain, Sprout, LineChart as LineChartIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Mock data - replace with actual data
const environmentalData = [
  {
    year: 2024,
    gesEmissions: 5.2,
    lixiviation: 25,
    n2oEmissions: 3.8,
    soilQuality: 6.5
  },
  {
    year: 2025,
    gesEmissions: 4.8,
    lixiviation: 22,
    n2oEmissions: 3.5,
    soilQuality: 7.0
  },
  {
    year: 2026,
    gesEmissions: 4.3,
    lixiviation: 19,
    n2oEmissions: 3.2,
    soilQuality: 7.5
  },
  {
    year: 2027,
    gesEmissions: 3.9,
    lixiviation: 17,
    n2oEmissions: 2.9,
    soilQuality: 8.0
  },
  {
    year: 2028,
    gesEmissions: 3.5,
    lixiviation: 15,
    n2oEmissions: 2.6,
    soilQuality: 8.5
  }
];

const metrics = [
  {
    title: 'Émissions GES',
    value: '3.5',
    unit: 'CO₂e/ha',
    change: '-15%',
    trend: 'down',
    icon: CloudRain,
    description: 'Émissions de gaz à effet de serre par hectare'
  },
  {
    title: 'Lixiviation',
    value: '15',
    unit: 'kg N/ha',
    change: '-12%',
    trend: 'down',
    icon: Droplets,
    description: 'Perte d\'azote par lixiviation'
  },
  {
    title: 'Émissions N₂O',
    value: '2.6',
    unit: 'kg N₂O/ha',
    change: '-18%',
    trend: 'down',
    icon: LineChartIcon,
    description: 'Émissions d\'oxyde nitreux'
  },
  {
    title: 'Qualité du Sol',
    value: '8.5',
    unit: '/10',
    change: '+25%',
    trend: 'up',
    icon: Sprout,
    description: 'Indice de qualité du sol'
  }
];

export function EnvironmentalTab() {
  const location = useLocation();
  const isBankView = location.pathname.includes('/agriculteurs/');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Impact Environnemental</h2>
        <p className="text-muted-foreground">
          {isBankView 
            ? "Suivi des indicateurs environnementaux clés de l'exploitation"
            : "Suivi des indicateurs environnementaux clés de votre exploitation"
          }
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <AnalyticsCard
            key={i}
            title={metric.title}
            value={`${metric.value} ${metric.unit}`}
            description={metric.description}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6">
        {/* GES Emissions */}
        <Card>
          <CardHeader>
            <CardTitle>Émissions GES (CO₂e/ha)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={environmentalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gesEmissions"
                    name="CO₂e/ha"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lixiviation and N2O */}
        <Card>
          <CardHeader>
            <CardTitle>Lixiviation et Émissions N₂O</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={environmentalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="lixiviation"
                    name="Lixiviation (kg N/ha)"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="n2oEmissions"
                    name="N₂O (kg/ha)"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Soil Quality */}
        <Card>
          <CardHeader>
            <CardTitle>Qualité du Sol</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={environmentalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="soilQuality"
                    name="Indice de qualité"
                    stroke="#eab308"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
