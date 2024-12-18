import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Euro, TrendingUp, ArrowUpDown, Wallet } from 'lucide-react';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chargesData = [
  {
    year: '2020',
    'Personnel': 0,
    'Mécanisation': 75000,
    'Bâtiments et Foncier': 22000,
    'Divers': 17000,
  },
  {
    year: '2021',
    'Personnel': 0,
    'Mécanisation': 77000,
    'Bâtiments et Foncier': 23000,
    'Divers': 18000,
  },
  {
    year: '2022',
    'Personnel': 0,
    'Mécanisation': 79000,
    'Bâtiments et Foncier': 24000,
    'Divers': 19000,
  },
  {
    year: '2023',
    'Personnel': 0,
    'Mécanisation': 81705,
    'Bâtiments et Foncier': 25000,
    'Divers': 19800,
  },
  {
    year: '2024',
    'Personnel': 0,
    'Mécanisation': 84000,
    'Bâtiments et Foncier': 26000,
    'Divers': 20500,
  },
];

const ratiosData = [
  {
    year: '2020',
    'Revenu Agricole': 5500,
    'Revenu Disponible': 35000,
    'Capacité d\'Autofinancement': 6000,
  },
  {
    year: '2021',
    'Revenu Agricole': 5800,
    'Revenu Disponible': 37000,
    'Capacité d\'Autofinancement': 6500,
  },
  {
    year: '2022',
    'Revenu Agricole': 6100,
    'Revenu Disponible': 39000,
    'Capacité d\'Autofinancement': 7000,
  },
  {
    year: '2023',
    'Revenu Agricole': 6385,
    'Revenu Disponible': 40115,
    'Capacité d\'Autofinancement': 7885,
  },
  {
    year: '2024',
    'Revenu Agricole': 6700,
    'Revenu Disponible': 41500,
    'Capacité d\'Autofinancement': 8500,
  },
];

export function FinancialPlanTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={() => navigate('/business-plan/financial-details')}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Voir détails
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Surface Totale"
          value={`95 ha`}
          subtitle="Surface exploitée"
          icon={ArrowUpDown}
          change={{
            value: 0,
            trend: 'neutral'
          }}
        />
        <AnalyticsCard
          title="Marge Brute"
          value={`119 k€`}
          subtitle="Toutes cultures"
          icon={Euro}
          change={{
            value: 3.5,
            trend: 'up'
          }}
        />
        <AnalyticsCard
          title="Charges de Structure"
          value={`127 k€`}
          subtitle="Total annuel"
          icon={Wallet}
          change={{
            value: 2.8,
            trend: 'up'
          }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Charges de Structure Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Charges de Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chargesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toLocaleString()}€`} />
                  <Legend />
                  <Line type="monotone" dataKey="Personnel" stroke="#ff7300" strokeWidth={2} />
                  <Line type="monotone" dataKey="Mécanisation" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="Bâtiments et Foncier" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="Divers" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ratios Financiers Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Ratios Financiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={ratiosData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toLocaleString()}€`} />
                  <Legend />
                  <Line type="monotone" dataKey="Revenu Agricole" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="Revenu Disponible" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="Capacité d'Autofinancement" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Synthèse Financière</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Charges de Structure */}
            <div className="space-y-4">
              <h3 className="font-bold text-base">Charges de Structure</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Frais de Personnel</span>
                  <span className="font-medium">0 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Frais de Mécanisation</span>
                  <span className="font-medium">81 705 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Frais Bâtiments et Foncier</span>
                  <span className="font-medium">25 000 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Frais Divers</span>
                  <span className="font-medium">19 800 €</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-semibold">Total Charges de Structure</span>
                  <span className="font-semibold">126 505 €</span>
                </div>
              </div>
            </div>

            {/* Right Column - Ratios Financiers */}
            <div className="space-y-4">
              <h3 className="font-bold text-base">Ratios Financiers</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Revenu Agricole</span>
                  <span className="font-medium">6 385 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Amortissements</span>
                  <span className="font-medium">46 500 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Revenu Disponible</span>
                  <span className="font-medium">40 115 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prélèvements privés courants</span>
                  <span className="font-medium">0 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Remboursement échéance</span>
                  <span className="font-medium">48 000 €</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-semibold">Capacité d'Autofinancement</span>
                  <span className="font-semibold">7 885 €</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FinancialPlanTab;
