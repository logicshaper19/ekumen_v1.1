import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import { OverviewTab } from '../business-plan/OverviewTab';
import { StrategyTab } from '../business-plan/StrategyTab';
import { FinancialPlanTab } from '../business-plan/FinancialPlanTab';
import { RisksAndOpportunities } from '../business-plan/RisksAndOpportunities';
import { EnvironmentalTab } from '../business-plan/EnvironmentalTab';
import { RegulationsSection } from '../business-plan/regulations/RegulationsSection';
import { TransformationsSection } from '../business-plan/transformations/TransformationsSection';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Tab = 'overview' | 'strategy' | 'financial' | 'environmental' | 'risks' | 'regulations' | 'transformations';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Aperçu' },
  { id: 'strategy', label: 'Stratégie' },
  { id: 'financial', label: 'Plan Financier' },
  { id: 'environmental', label: 'Impact Environnemental' },
  { id: 'risks', label: 'Risques et Opportunités' },
  { id: 'regulations', label: 'Réglementations' },
  { id: 'transformations', label: 'Transformations' },
];

export function BusinessPlan() {
  const location = useLocation();
  const { id } = useParams();
  const isBankView = location.pathname.includes('/agriculteurs/');
  const initialTab = location.state?.activeTab || 'overview';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const navigate = useNavigate();

  // Farmer data for bank view
  const farmerData = {
    name: "Jean Dupont",
    companyInfo: {
      siret: "123 456 789 00012",
      location: "123 Rue de l'Agriculture, Bourgogne-Franche-Comté",
      owner: "Jean Dupont",
      phone: "06 12 34 56 78",
      email: "jean.dupont@email.com"
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back button for bank view */}
      {isBankView && (
        <div className="mb-6">
          <Button
            variant="ghost"
            className="gap-2 text-gray-600 hover:text-gray-900"
            onClick={() => navigate(`/agriculteurs/${id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au profil de l'exploitation
          </Button>
        </div>
      )}

      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-bold">Business Plan</h1>
        <p className="text-muted-foreground">
          {isBankView 
            ? "Suivez l'évolution du business plan de l'exploitation"
            : "Suivez l'évolution de votre business plan"
          }
        </p>
      </div>

      {/* Show farmer info only in bank view */}
      {isBankView && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Information de l'exploitation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Exploitant</p>
                  <p className="text-sm text-gray-500">{farmerData.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">SIRET</p>
                  <p className="text-sm text-gray-500">{farmerData.companyInfo.siret}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Adresse</p>
                  <p className="text-sm text-gray-500">{farmerData.companyInfo.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Contact</p>
                  <p className="text-sm text-gray-500">{farmerData.companyInfo.phone}</p>
                  <p className="text-sm text-gray-500">{farmerData.companyInfo.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
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

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'strategy' && <StrategyTab />}
        {activeTab === 'financial' && <FinancialPlanTab />}
        {activeTab === 'environmental' && <EnvironmentalTab />}
        {activeTab === 'risks' && <RisksAndOpportunities />}
        {activeTab === 'regulations' && <RegulationsSection />}
        {activeTab === 'transformations' && <TransformationsSection />}
      </div>
    </div>
  );
}