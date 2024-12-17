import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
  },
  {
    id: 'insurance-risk-coverage',
    title: 'Couverture Inadaptée',
    description: 'Risque de pertes non couvertes par les contrats actuels',
    stakeholder: 'Assurance'
  }
];

const opportunities: RiskOpportunityItem[] = [
  {
    id: 'maelab-opp-precision',
    title: 'Agriculture de Précision',
    description: 'Optimisation des pratiques agricoles grâce aux données et technologies innovantes',
    stakeholder: 'MaeLabs'
  },
  {
    id: 'ca-opp-green',
    title: 'Financement Vert',
    description: 'Accès à des prêts avantageux pour les projets écologiques et durables',
    stakeholder: 'Crédit Agricole'
  },
  {
    id: 'accountant-opp-tax',
    title: 'Optimisation Fiscale',
    description: 'Réduction d\'impôts via des investissements stratégiques et dispositifs fiscaux',
    stakeholder: 'Comptable'
  },
  {
    id: 'chamber-opp-subsidy',
    title: 'Aides PAC',
    description: 'Accès aux nouvelles subventions pour les pratiques agricoles durables',
    stakeholder: 'Chambre d\'Agriculture'
  },
  {
    id: 'coop-opp-mutualisation',
    title: 'Mutualisation',
    description: 'Partage des ressources et équipements pour réduire les coûts',
    stakeholder: 'Coopérative'
  },
  {
    id: 'carrefour-opp-bio',
    title: 'Premium Bio',
    description: 'Valorisation supérieure des produits via la filière bio',
    stakeholder: 'Carrefour'
  },
  {
    id: 'insurance-opp-products',
    title: 'Nouveaux Produits',
    description: 'Solutions d\'assurance innovantes pour les risques climatiques',
    stakeholder: 'Assurance'
  }
];

export function RisksAndOpportunities() {
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/business-plan/risks-opportunities/${id}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyse des Risques et Opportunités</CardTitle>
          <p className="text-gray-600">
            {risks.length} risques et {opportunities.length} opportunités identifiés par vos parties prenantes
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risks Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-medium">Risques Principaux</h3>
              </div>
              <div className="space-y-4">
                {risks.map((risk) => (
                  <div 
                    key={risk.id}
                    onClick={() => handleItemClick(risk.id)}
                    className="cursor-pointer p-3 rounded-md transition-colors bg-white hover:bg-accent/50"
                  >
                    <dt className="text-sm text-gray-500 mb-1">{risk.title} ({risk.stakeholder})</dt>
                    <dd className="text-sm font-medium text-gray-900">{risk.description}</dd>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Opportunities Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-medium">Opportunités Clés</h3>
              </div>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id}
                    onClick={() => handleItemClick(opportunity.id)}
                    className="cursor-pointer p-3 rounded-md transition-colors bg-white hover:bg-accent/50"
                  >
                    <dt className="text-sm text-gray-500 mb-1">{opportunity.title} ({opportunity.stakeholder})</dt>
                    <dd className="text-sm font-medium text-gray-900">{opportunity.description}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
