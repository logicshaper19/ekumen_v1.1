import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Euro, 
  Sprout, 
  Scale, 
  Droplets,
  Target,
  Users,
  Building2,
  Landmark,
  BarChart3,
  PiggyBank,
  CircleDollarSign,
  Percent,
  AlertTriangle
} from 'lucide-react';
import { OverviewTab } from '../business-plan/OverviewTab';
import { StrategyTab } from '../business-plan/StrategyTab';
import { FinancialPlanTab } from '../business-plan/FinancialPlanTab';
import { RisksAndOpportunities } from '../business-plan/RisksAndOpportunities';
import { useNavigate } from 'react-router-dom';

type Tab = 'overview' | 'strategy' | 'financial' | 'risks';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Aperçu' },
  { id: 'strategy', label: 'Stratégie' },
  { id: 'financial', label: 'Plan Financier' },
  { id: 'risks', label: 'Risques et Opportunités' },
];

interface KPI {
  title: string;
  titleClassName?: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
}

const kpisByTab: Record<Tab, KPI[]> = {
  overview: [
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
  ],
  strategy: [
    {
      title: 'Objectifs Atteints',
      value: '75%',
      change: '+15%',
      trend: 'up',
      icon: Target,
    },
    {
      title: 'Efficacité Main d\'œuvre',
      value: '92%',
      change: '+5%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Utilisation Équipement',
      value: '85%',
      change: '+10%',
      trend: 'up',
      icon: Building2,
    },
    {
      title: 'Innovation Score',
      value: '8.5/10',
      change: '+1.2',
      trend: 'up',
      icon: BarChart3,
    },
  ],
  financial: [
    {
      title: 'Marge Brute',
      value: '120 120 €',
      change: '+12.5%',
      trend: 'up',
      icon: Landmark,
    },
    {
      title: 'Capacité d\'Autofinancement',
      value: '7 885 €',
      change: '-2.3%',
      trend: 'down',
      icon: PiggyBank,
    },
    {
      title: 'Revenu Disponible',
      value: '40 115 €',
      change: '+5.8%',
      trend: 'up',
      icon: CircleDollarSign,
    },
    {
      title: 'Taux d\'Endettement',
      value: '45%',
      change: '-3%',
      trend: 'down',
      icon: Percent,
    },
  ],
  risks: [
    {
      title: 'Réglementation Évolutive',
      titleClassName: 'text-orange-600',
      value: '10%',
      change: '+2%',
      trend: 'up',
      icon: AlertTriangle,
    },
    {
      title: 'Risque de Défaillance',
      value: '5%',
      change: '-1%',
      trend: 'down',
      icon: AlertTriangle,
    },
    {
      title: 'Risque de Changement',
      value: '8%',
      change: '+3%',
      trend: 'up',
      icon: AlertTriangle,
    },
    {
      title: 'Risque de Perte d\'Opportunités',
      value: '12%',
      change: '+4%',
      trend: 'up',
      icon: AlertTriangle,
    },
  ],
};

export function BusinessPlan() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const currentKPIs = kpisByTab[activeTab];
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'strategy':
        return <StrategyTab />;
      case 'financial':
        return <FinancialPlanTab />;
      case 'risks':
        return <RisksAndOpportunities />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Tabs */}
      <div className="flex justify-between items-start pb-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Plan d'Exploitation</h1>
          <p className="text-muted-foreground">
            Suivez vos indicateurs clés de performance et découvrez des opportunités d'amélioration
          </p>
        </div>

        {/* Tabs Navigation */}
        <nav className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium
                transition-colors duration-200
                ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentKPIs.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${kpi.titleClassName || ''}`}>{kpi.title}</CardTitle>
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

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}