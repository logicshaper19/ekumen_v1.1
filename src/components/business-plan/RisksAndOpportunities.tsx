import React from 'react';
import { AlertTriangle, TrendingUp, ShieldAlert, Target, ArrowUpRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AnalyticsCard } from '@/components/ui/analytics-card';

interface RiskOpportunityItem {
  id: string;
  title: string;
  description: string;
  stakeholder: string;
}

const risks: RiskOpportunityItem[] = [
  {
    id: 'maelab-risk-soil',
    title: 'Dégradation des Sols',
    description: 'Risque de perte de fertilité et de structure des sols due aux pratiques agricoles intensives',
    stakeholder: 'MaeLabs'
  },
  {
    id: 'ca-risk-debt',
    title: 'Endettement Excessif',
    description: 'Risque de surendettement lié aux investissements matériels et fonciers',
    stakeholder: 'Crédit Agricole'
  },
  {
    id: 'accountant-risk-cash',
    title: 'Trésorerie Tendue',
    description: 'Difficultés de trésorerie saisonnières impactant la gestion quotidienne',
    stakeholder: 'Comptable'
  },
  {
    id: 'chamber-risk-compliance',
    title: 'Non-Conformité Réglementaire',
    description: 'Risque de non-respect des nouvelles normes environnementales',
    stakeholder: 'Chambre d\'Agriculture'
  },
  {
    id: 'coop-risk-quality',
    title: 'Qualité des Produits',
    description: 'Non-respect des standards de qualité requis par la coopérative',
    stakeholder: 'Coopérative'
  },
  {
    id: 'carrefour-risk-contract',
    title: 'Exigences Contractuelles',
    description: 'Difficultés à respecter les cahiers des charges stricts',
    stakeholder: 'Carrefour'
  }
];

const opportunities: RiskOpportunityItem[] = [
  {
    id: 'market-opp-bio',
    title: 'Marché Bio',
    description: 'Forte demande croissante pour les produits biologiques',
    stakeholder: 'Consommateurs'
  },
  {
    id: 'tech-opp-precision',
    title: 'Agriculture de Précision',
    description: 'Optimisation des ressources grâce aux nouvelles technologies',
    stakeholder: 'MaeLabs'
  },
  {
    id: 'local-opp-circuit',
    title: 'Circuits Courts',
    description: 'Développement de la vente directe et locale',
    stakeholder: 'Collectivités'
  },
  {
    id: 'subsidy-opp-green',
    title: 'Aides Écologiques',
    description: 'Subventions pour la transition écologique',
    stakeholder: 'État'
  }
];

export function RisksAndOpportunities() {
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/business-plan/risks-opportunities/${id}`);
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Identifiez et gérez les risques potentiels tout en saisissant les opportunités de développement pour votre exploitation.
      </p>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Opportunités"
          value="12"
          description="nouvelles opportunités"
          change="+3"
          trend="up"
          icon={Target}
        />
        <AnalyticsCard
          title="Risques"
          value="5"
          description="risques identifiés"
          change="-2"
          trend="down"
          icon={AlertTriangle}
        />
        <AnalyticsCard
          title="Actions"
          value="8"
          description="en cours"
          change="+4"
          trend="up"
          icon={Play}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Risques Identifiés
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {risks.map((risk) => (
                <div 
                  key={risk.id}
                  onClick={() => handleItemClick(risk.id)}
                  className="cursor-pointer bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{risk.title}</h4>
                    <span className="text-xs text-gray-500">{risk.stakeholder}</span>
                  </div>
                  <p className="text-sm text-gray-600">{risk.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Opportunités
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div 
                  key={opportunity.id}
                  onClick={() => handleItemClick(opportunity.id)}
                  className="cursor-pointer bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{opportunity.title}</h4>
                    <span className="text-xs text-gray-500">{opportunity.stakeholder}</span>
                  </div>
                  <p className="text-sm text-gray-600">{opportunity.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
