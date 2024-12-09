import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState(
    (location.state as any)?.activeTab || 'risks'
  );

  const handleItemClick = (id: string) => {
    navigate(`/business-plan/risks-opportunities/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Analyse des Risques et Opportunités</h2>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('risks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'risks' 
                ? 'bg-red-50 text-red-700' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            Risques Principaux
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'opportunities' 
                ? 'bg-green-50 text-green-700' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Opportunités Clés
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'risks' ? (
            <div>
              <dl className="space-y-2">
                {risks.map((risk) => (
                  <div 
                    key={risk.id}
                    onClick={() => handleItemClick(risk.id)}
                    className="cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors"
                  >
                    <dt className="text-sm text-gray-500">{risk.title} ({risk.stakeholder})</dt>
                    <dd className="text-base font-medium">{risk.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <div>
              <dl className="space-y-2">
                {opportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id}
                    onClick={() => handleItemClick(opportunity.id)}
                    className="cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors"
                  >
                    <dt className="text-sm text-gray-500">{opportunity.title} ({opportunity.stakeholder})</dt>
                    <dd className="text-base font-medium">{opportunity.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
