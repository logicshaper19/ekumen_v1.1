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
  source: 'Chambre d\'Agriculture Bretagne' | 'Crédit Agricole' | 'Groupama' | 'MaeLabs';
}

const risks: RiskOpportunityItem[] = [
  {
    id: 'maelab-risk-soil',
    title: 'Dégradation des sols',
    description: 'Risque de perte de fertilité des sols dû aux pratiques intensives',
    stakeholder: 'Exploitation',
    source: 'Chambre d\'Agriculture Bretagne'
  },
  {
    id: 'insurance-risk-coverage',
    title: 'Changement climatique',
    description: 'Impact des conditions météorologiques extrêmes sur les cultures',
    stakeholder: 'Environnement',
    source: 'Groupama'
  },
  {
    id: 'ca-risk-debt',
    title: 'Volatilité des prix',
    description: 'Fluctuations importantes des prix des produits agricoles',
    stakeholder: 'Marché',
    source: 'Crédit Agricole'
  }
];

const opportunities: RiskOpportunityItem[] = [
  {
    id: 'maelab-opp-innovation',
    title: 'Marché bio',
    description: 'Forte croissance du marché des produits biologiques',
    stakeholder: 'Marché',
    source: 'MaeLabs'
  },
  {
    id: 'chamber-opp-tech',
    title: 'Nouvelles technologies',
    description: 'Opportunités d\'amélioration via l\'agriculture de précision',
    stakeholder: 'Innovation',
    source: 'Chambre d\'Agriculture Bretagne'
  },
  {
    id: 'ca-opp-local',
    title: 'Circuit court',
    description: 'Développement des circuits de distribution locaux',
    stakeholder: 'Distribution',
    source: 'Crédit Agricole'
  }
];

export function RisksAndOpportunities() {
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/business-plan/risks-opportunities/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Risques Identifiés"
          value={risks.length.toString()}
          description="risques majeurs"
          change="+2"
          trend="up"
          icon={AlertTriangle}
        />

        <AnalyticsCard
          title="Opportunités"
          value={opportunities.length.toString()}
          description="opportunités identifiées"
          change="+1"
          trend="up"
          icon={TrendingUp}
        />

        <AnalyticsCard
          title="Score de Résilience"
          value="72%"
          description="capacité d'adaptation"
          change="+5%"
          trend="up"
          icon={ShieldAlert}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risques Majeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {risks.map((risk) => (
                <div
                  key={risk.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleItemClick(risk.id)}
                >
                  <div className="space-y-1">
                    <div className="font-medium">{risk.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {risk.description}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        {risk.stakeholder}
                      </div>
                      <div className="text-sm font-bold text-primary">
                        {risk.source}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opportunités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleItemClick(opportunity.id)}
                >
                  <div className="space-y-1">
                    <div className="font-medium">{opportunity.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {opportunity.description}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        {opportunity.stakeholder}
                      </div>
                      <div className="text-sm font-bold text-primary">
                        {opportunity.source}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
