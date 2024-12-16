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
import { AnalyticsCard } from '../business-plan/AnalyticsCard';
import { useNavigate, useLocation } from 'react-router-dom';
import cn from 'classnames';

type Tab = 'overview' | 'strategy' | 'financial' | 'risks';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Aperçu' },
  { id: 'strategy', label: 'Stratégie' },
  { id: 'financial', label: 'Plan Financier' },
  { id: 'risks', label: 'Risques et Opportunités' },
];

interface KPI {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ElementType;
  description?: string;
}

const kpisByTab: Record<Tab, KPI[]> = {
  overview: [
    {
      title: 'Revenu Mensuel',
      value: '12 500 €',
      change: '+8.2%',
      trend: 'up',
      icon: Euro,
      description: 'par rapport au mois dernier'
    },
    {
      title: 'Rendement Moyen',
      value: '7.2 t/ha',
      change: '+2.1%',
      trend: 'up',
      icon: Sprout,
      description: 'toutes cultures confondues'
    },
    {
      title: 'Coûts Opérationnels',
      value: '4 200 €',
      change: '-3.1%',
      trend: 'down',
      icon: Scale,
      description: 'réduction des dépenses'
    },
    {
      title: 'Consommation d\'Eau',
      value: '850 m³',
      change: '-5.2%',
      trend: 'down',
      icon: Droplets,
      description: 'économies réalisées'
    },
  ],
  strategy: [
    {
      title: 'Objectifs Atteints',
      value: '75%',
      change: '+15%',
      trend: 'up',
      icon: Target,
      description: 'progression constante'
    },
    {
      title: 'Efficacité Main d\'œuvre',
      value: '92%',
      change: '+5%',
      trend: 'up',
      icon: Users,
      description: 'amélioration continue'
    },
    {
      title: 'Utilisation Équipement',
      value: '85%',
      change: '+10%',
      trend: 'up',
      icon: Building2,
      description: 'optimisation en cours'
    },
    {
      title: 'Innovation Score',
      value: '8.5/10',
      change: '+1.2',
      trend: 'up',
      icon: Landmark,
      description: 'adoption des nouvelles tech.'
    },
  ],
  financial: [
    {
      title: 'Marge Brute',
      value: '45 000 €',
      change: '+12%',
      trend: 'up',
      icon: BarChart3,
      description: 'trimestre en cours'
    },
    {
      title: 'Trésorerie',
      value: '28 500 €',
      change: '+15%',
      trend: 'up',
      icon: PiggyBank,
      description: 'disponible'
    },
    {
      title: 'ROI Moyen',
      value: '18.5%',
      change: '+2.5%',
      trend: 'up',
      icon: CircleDollarSign,
      description: 'retour sur investissement'
    },
    {
      title: 'Taux d\'Endettement',
      value: '32%',
      change: '-5%',
      trend: 'down',
      icon: Percent,
      description: 'en amélioration'
    },
  ],
  risks: [
    {
      title: 'Niveau de Risque',
      value: 'Modéré',
      change: '-10%',
      trend: 'down',
      icon: AlertTriangle,
      description: 'exposition globale'
    },
    {
      title: 'Opportunités',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Target,
      description: 'identifiées ce trimestre'
    },
    {
      title: 'Couverture',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: Scale,
      description: 'des risques majeurs'
    },
    {
      title: 'Impact Financier',
      value: '15k €',
      change: '-8%',
      trend: 'down',
      icon: Euro,
      description: 'estimation des pertes'
    },
  ],
};

export function BusinessPlan() {
  const location = useLocation();
  const initialTab = location.state?.activeTab || 'overview';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const currentKPIs = kpisByTab[activeTab];
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'pb-2 text-sm font-medium transition-colors hover:text-primary',
              tab.id === activeTab
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {currentKPIs.map((kpi, index) => (
          <Card key={index} className="bg-[#F5F5F0]">
            <CardContent className="pt-6">
              <AnalyticsCard
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                trend={kpi.trend}
                icon={kpi.icon}
                description={kpi.description}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'strategy' && <StrategyTab />}
        {activeTab === 'financial' && <FinancialPlanTab />}
        {activeTab === 'risks' && <RisksAndOpportunities />}
      </div>
    </div>
  );
}