import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RisksAndOpportunities() {
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/business-plan/risks-opportunities/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Analyse des Risques et Opportunités</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Risques Principaux
            </h3>
            <dl className="space-y-2">
              <div 
                onClick={() => handleItemClick('changement-climatique')}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <dt className="text-sm text-gray-500">Changement Climatique</dt>
                <dd className="text-base font-medium">Impact potentiel des conditions météorologiques extrêmes sur les cultures</dd>
              </div>
              <div 
                onClick={() => handleItemClick('volatilite-prix')}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <dt className="text-sm text-gray-500">Volatilité des Prix</dt>
                <dd className="text-base font-medium">Fluctuations des prix du marché affectant la rentabilité</dd>
              </div>
              <div 
                onClick={() => handleItemClick('reglementation-evolutive')}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <dt className="text-sm font-medium text-orange-600">Réglementation Évolutive</dt>
                <dd className="text-base font-medium">Nouvelles normes environnementales nécessitant des adaptations</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Opportunités Clés
            </h3>
            <dl className="space-y-2">
              <div 
                onClick={() => handleItemClick('agriculture-biologique')}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <dt className="text-sm text-gray-500">Agriculture Biologique</dt>
                <dd className="text-base font-medium">Potentiel de conversion avec primes de prix</dd>
              </div>
              <div 
                onClick={() => handleItemClick('irrigation-efficace')}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <dt className="text-sm text-gray-500">Irrigation Efficace</dt>
                <dd className="text-base font-medium">Modernisation du système d'irrigation pour économiser l'eau</dd>
              </div>
              <div 
                onClick={() => handleItemClick('energie-renouvelable')}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <dt className="text-sm text-gray-500">Énergie Renouvelable</dt>
                <dd className="text-base font-medium">Installation potentielle d'éoliennes pour la production d'énergie</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
