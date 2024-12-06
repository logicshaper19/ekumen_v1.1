import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Euro, Sprout, Scale, Droplets } from 'lucide-react';

export function BusinessPlan() {
  const kpis = [
    {
      title: 'Revenu Mensuel',
      value: '12 500 €',
      change: '+8.2%',
      trend: 'up',
      icon: Euro,
    },
    {
      title: 'Rendement Moyen',
      value: '7.2 t/ha',
      change: '+2.1%',
      trend: 'up',
      icon: Sprout,
    },
    {
      title: 'Coûts Opérationnels',
      value: '4 200 €',
      change: '-3.1%',
      trend: 'down',
      icon: Scale,
    },
    {
      title: 'Consommation d\'Eau',
      value: '850 m³',
      change: '-5.2%',
      trend: 'down',
      icon: Droplets,
    },
  ];

  const recommendations = [
    {
      title: 'Optimisation des Coûts',
      description: 'Possibilité de réduire les coûts d\'intrants de 12% en adoptant des pratiques de précision.',
      impact: 'Économie potentielle: 5 000 €/an',
    },
    {
      title: 'Diversification des Cultures',
      description: 'L\'ajout de légumineuses pourrait améliorer la fertilité des sols et réduire les coûts d\'engrais.',
      impact: 'Amélioration du rendement: +15%',
    },
    {
      title: 'Gestion de l\'Eau',
      description: 'Installation d\'un système d\'irrigation goutte à goutte pour optimiser l\'utilisation de l\'eau.',
      impact: 'Réduction de la consommation: -30%',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Plan d'Exploitation</h1>
        <p className="mt-2 text-gray-600">
          Suivez vos indicateurs clés de performance et découvrez des opportunités d'amélioration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <p className={`text-sm ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {kpi.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommandations d'Optimisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.map((rec) => (
              <div key={rec.title} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                <p className="text-gray-600 mb-2">{rec.description}</p>
                <p className="text-sm font-medium text-black">{rec.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}