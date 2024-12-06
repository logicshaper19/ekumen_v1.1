import React from 'react';

export function StrategyTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Stratégie d'Exploitation</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Axes Stratégiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-green-600 font-semibold mb-2">Diversification</div>
                <p className="text-sm text-gray-600">Introduction de nouvelles cultures à haute valeur ajoutée</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-blue-600 font-semibold mb-2">Durabilité</div>
                <p className="text-sm text-gray-600">Transition vers des pratiques agricoles plus durables</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-purple-600 font-semibold mb-2">Innovation</div>
                <p className="text-sm text-gray-600">Adoption de technologies agricoles de précision</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Plan d'Action</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-semibold">1</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Court Terme (0-6 mois)</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Analyse des sols et planification des rotations</li>
                    <li>• Formation aux nouvelles technologies</li>
                    <li>• Étude de marché pour nouvelles cultures</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">2</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Moyen Terme (6-18 mois)</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Mise en place de l'agriculture de précision</li>
                    <li>• Développement des circuits courts</li>
                    <li>• Certification environnementale</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-semibold">3</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Long Terme (18+ mois)</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Extension des surfaces cultivées</li>
                    <li>• Investissement dans le stockage</li>
                    <li>• Développement de la marque</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
