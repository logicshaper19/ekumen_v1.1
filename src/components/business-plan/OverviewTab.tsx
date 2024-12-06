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
            <h3 className="text-lg font-medium mb-3">Objectifs 2024</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Augmentation rendement de 15%</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                <span>Certification Bio sur 20 ha</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Réduction consommation d'eau de 20%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Progression Annuelle</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Objectifs Financiers</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Développement Durable</span>
              <span className="text-sm font-medium">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Innovation Technique</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
