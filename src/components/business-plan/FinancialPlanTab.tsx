import React from 'react';

interface CropData {
  name: string;
  surface: number;
  yield: number;
  netPrice: number;
  subsidies: number;
  productTotal: number;
  productPerHa: number;
  fertilizer: number;
  seeds: number;
  treatments: number;
  chargesTotal: number;
  chargesPerHa: number;
  marginTotal: number;
  marginPerHa: number;
}

const crops: CropData[] = [
  {
    name: 'Colza',
    surface: 12,
    yield: 3.2,
    netPrice: 490,
    subsidies: 190,
    productTotal: 21,
    productPerHa: 1782,
    fertilizer: 372,
    seeds: 72,
    treatments: 310,
    chargesTotal: 9,
    chargesPerHa: 754,
    marginTotal: 12,
    marginPerHa: 1028
  },
  {
    name: 'Blé',
    surface: 64,
    yield: 7.3,
    netPrice: 220,
    subsidies: 190,
    productTotal: 116,
    productPerHa: 1806,
    fertilizer: 283,
    seeds: 95,
    treatments: 230,
    chargesTotal: 39,
    chargesPerHa: 608,
    marginTotal: 77,
    marginPerHa: 1198
  },
  {
    name: 'Orge',
    surface: 19,
    yield: 6.6,
    netPrice: 313,
    subsidies: 190,
    productTotal: 44,
    productPerHa: 2268,
    fertilizer: 306,
    seeds: 194,
    treatments: 230,
    chargesTotal: 14,
    chargesPerHa: 730,
    marginTotal: 30,
    marginPerHa: 1539
  }
];

const structuralCosts = [
  { category: 'FRAIS DE PERSONNEL', items: [
    { name: 'Salaires et charges sur salaires', amount: 0 },
    { name: 'Charges sociales des Exploitants', amount: 0 }
  ]},
  { category: 'FRAIS DE MÉCANISATION', items: [
    { name: 'Carburant', amount: 9405 },
    { name: 'Entretien du matériel', amount: 5000 },
    { name: 'Amortissements', amount: 39000 },
    { name: 'Leasing et travaux par tiers', amount: 28300 }
  ]},
  { category: 'FRAIS BATIMENTS ET FONCIER', items: [
    { name: 'Fermages et impôts fonciers', amount: 15500 },
    { name: 'Entretien des bâtiments', amount: 2000 },
    { name: 'Amortissements des bâtiments', amount: 7500 }
  ]},
  { category: 'FRAIS DIVERS', items: [
    { name: 'Eau/elec/gaz', amount: 2500 },
    { name: 'Compta/conseil tech/autres', amount: 4000 },
    { name: 'Assurances (cultures+rc)', amount: 5000 },
    { name: 'Transport (inter site)', amount: 1000 },
    { name: 'Frais financiers LMT', amount: 6000 },
    { name: 'Frais financiers CT', amount: 0 },
    { name: 'Frais financiers CCA', amount: 300 },
    { name: 'Divers', amount: 1000 }
  ]}
];

export function FinancialPlanTab() {
  const totalSurface = crops.reduce((sum, crop) => sum + crop.surface, 0);
  
  return (
    <div className="space-y-8">
      {/* Crops and Margins Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Marges Brutes par Culture</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Culture</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Surface (ha)</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rendement</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix net</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aides/ha</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Produit k€</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Produit €/ha</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Marge k€</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Marge €/ha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crops.map((crop, index) => (
                <tr key={crop.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{crop.name}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.surface}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.yield}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.netPrice}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.subsidies}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.productTotal}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.productPerHa}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.marginTotal}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.marginPerHa}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">TOTAL</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">{totalSurface}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {crops.reduce((sum, crop) => sum + crop.productTotal, 0)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {crops.reduce((sum, crop) => sum + crop.marginTotal, 0)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Structural Costs Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Charges de Structure</h2>
        <div className="space-y-6">
          {structuralCosts.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-medium mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-sm font-medium">{item.amount.toLocaleString()} €</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total {category.category}</span>
                    <span>{category.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} €</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Ratios Financiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Résultat</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">REVENU AGRICOLE</span>
                <span className="text-sm font-medium">6,385 €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">+ Amortissements</span>
                <span className="text-sm font-medium">46,500 €</span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <span>= REVENU DISPONIBLE</span>
                <span>40,115 €</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Capacité d'Autofinancement</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">- Prélèvements privés courants</span>
                <span className="text-sm font-medium">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">- Remboursement échéance</span>
                <span className="text-sm font-medium">48,000 €</span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <span>= CAPACITÉ D'AUTOFINANCEMENT</span>
                <span>7,885 €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
