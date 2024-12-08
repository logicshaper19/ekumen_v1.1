import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

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

export function FinancialPlanDetailsPage() {
  const navigate = useNavigate();
  const totalSurface = crops.reduce((sum, crop) => sum + crop.surface, 0);

  const handleBack = () => {
    navigate('/business-plan', { state: { activeTab: 'financial' } });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plan Financier Détaillé</h1>
        <Button
          variant="outline"
          onClick={handleBack}
        >
          Retour au Plan Financier
        </Button>
      </div>

      {/* Detailed Crops Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Analyse Détaillée des Cultures</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Culture</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Surface (ha)</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rendement</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix net</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aides/ha</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Engrais</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Semences</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Traitements</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Charges k€</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Charges €/ha</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Marge k€</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Marge €/ha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crops.map((crop, index) => (
                <tr 
                  key={crop.name} 
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} cursor-pointer hover:bg-gray-100 transition-colors`}
                  onClick={() => navigate(`/business-plan/financial-plan-details/crop/${encodeURIComponent(crop.name)}`)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{crop.name}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.surface}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.yield}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.netPrice}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.subsidies}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.fertilizer}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.seeds}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.treatments}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.chargesTotal}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{crop.chargesPerHa}</td>
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
                  {crops.reduce((sum, crop) => sum + crop.fertilizer, 0)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {crops.reduce((sum, crop) => sum + crop.seeds, 0)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {crops.reduce((sum, crop) => sum + crop.treatments, 0)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {crops.reduce((sum, crop) => sum + crop.chargesTotal, 0)}
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

      {/* Detailed Structural Costs Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Analyse Détaillée des Charges de Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {structuralCosts.map((category) => (
            <div key={category.category} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">{category.category}</h3>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-sm font-medium">{item.amount.toLocaleString()} €</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-300">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total {category.category}</span>
                    <span>{category.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} €</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-4">Total des Charges de Structure</h3>
          <div className="flex justify-between items-center font-medium text-lg">
            <span>TOTAL</span>
            <span>
              {structuralCosts.reduce((sum, category) => 
                sum + category.items.reduce((itemSum, item) => itemSum + item.amount, 0), 
                0
              ).toLocaleString()} €
            </span>
          </div>
        </div>
      </div>

      {/* Financial Ratios and Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Analyse Financière Détaillée</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Résultat d'Exploitation</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Produit Brut Total</span>
                <span className="text-sm font-medium">
                  {crops.reduce((sum, crop) => sum + crop.productTotal * 1000, 0).toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Charges Opérationnelles</span>
                <span className="text-sm font-medium">
                  {crops.reduce((sum, crop) => sum + crop.chargesTotal * 1000, 0).toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Charges de Structure</span>
                <span className="text-sm font-medium">
                  {structuralCosts.reduce((sum, category) => 
                    sum + category.items.reduce((itemSum, item) => itemSum + item.amount, 0), 
                    0
                  ).toLocaleString()} €
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center font-medium">
                  <span>Résultat d'Exploitation</span>
                  <span>6,385 €</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Ratios Clés</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Marge Brute Moyenne/ha</span>
                <span className="text-sm font-medium">
                  {Math.round(crops.reduce((sum, crop) => sum + (crop.marginTotal * 1000) / totalSurface, 0)).toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Charges de Structure/ha</span>
                <span className="text-sm font-medium">
                  {Math.round(structuralCosts.reduce((sum, category) => 
                    sum + category.items.reduce((itemSum, item) => itemSum + item.amount, 0), 
                    0) / totalSurface).toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">EBE</span>
                <span className="text-sm font-medium">52,885 €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taux de rentabilité</span>
                <span className="text-sm font-medium">12.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
