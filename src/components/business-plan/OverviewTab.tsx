import React from 'react';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Aperçu de l'Exploitation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Informations Clés</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Surface Totale</dt>
                <dd className="text-base font-medium">85 hectares</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Cultures Principales</dt>
                <dd className="text-base font-medium">Blé, Maïs, Tournesol</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Type d'Agriculture</dt>
                <dd className="text-base font-medium">Conventionnelle</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Objectifs 2024</h3>
            <div className="flex justify-between items-end gap-12">
              <div className="flex-1 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium mb-2">Rendement</span>
                  <p className="text-sm text-gray-600 mb-3 h-12">
                    Augmenter la productivité des cultures de 15%
                  </p>
                  <span className="text-sm text-gray-500 mb-2">Objectif: 15%</span>
                  <div className="relative w-24 bg-gray-100" style={{ height: '160px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-green-500 transition-all duration-500"
                      style={{ height: '53%' }}
                    />
                    <span className="absolute -right-8 bottom-[53%] transform translate-y-1/2 text-sm font-medium">
                      8%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    +8% depuis janvier
                  </p>
                </div>
              </div>

              <div className="flex-1 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium mb-2">Surface Bio</span>
                  <p className="text-sm text-gray-600 mb-3 h-12">
                    Convertir 20ha en agriculture biologique
                  </p>
                  <span className="text-sm text-gray-500 mb-2">Objectif: 20ha</span>
                  <div className="relative w-24 bg-gray-100" style={{ height: '160px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-yellow-500 transition-all duration-500"
                      style={{ height: '60%' }}
                    />
                    <span className="absolute -right-8 bottom-[60%] transform translate-y-1/2 text-sm font-medium">
                      12ha
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    En conversion
                  </p>
                </div>
              </div>

              <div className="flex-1 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium mb-2">Économie d'Eau</span>
                  <p className="text-sm text-gray-600 mb-3 h-12">
                    Réduire la consommation d'eau de 20%
                  </p>
                  <span className="text-sm text-gray-500 mb-2">Objectif: 20%</span>
                  <div className="relative w-24 bg-gray-100" style={{ height: '160px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500"
                      style={{ height: '65%' }}
                    />
                    <span className="absolute -right-8 bottom-[65%] transform translate-y-1/2 text-sm font-medium">
                      13%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    vs. 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
