import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { OverviewTab } from '../business-plan/OverviewTab';
import { StrategyTab } from '../business-plan/StrategyTab';
import { FinancialPlanTab } from '../business-plan/FinancialPlanTab';
import { RisksAndOpportunities } from '../business-plan/RisksAndOpportunities';
import { EnvironmentalTab } from '../business-plan/EnvironmentalTab';

type Tab = 'overview' | 'strategy' | 'financial' | 'environmental' | 'risks';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Aperçu' },
  { id: 'strategy', label: 'Stratégie' },
  { id: 'financial', label: 'Plan Financier' },
  { id: 'environmental', label: 'Impact Environnemental' },
  { id: 'risks', label: 'Risques et Opportunités' },
];

export function BusinessPlan() {
  const location = useLocation();
  const initialTab = location.state?.activeTab || 'overview';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-bold">Plan d'Affaires</h1>
        <p className="text-gray-600">
          Suivez et gérez votre plan d'affaires, incluant vos objectifs stratégiques et indicateurs de performance clés.
        </p>
      </div>

      <div className="flex justify-end space-x-4 border-b mb-6">
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

      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'strategy' && <StrategyTab />}
        {activeTab === 'financial' && <FinancialPlanTab />}
        {activeTab === 'environmental' && <EnvironmentalTab />}
        {activeTab === 'risks' && <RisksAndOpportunities />}
      </div>
    </div>
  );
}