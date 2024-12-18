import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CropDetailView } from './CropDetailView';

interface CropData {
  name: string;
  surface: number;
  yield: number;
  netPrice: number;
  subsidies: number;
  productTotal: number;
  productPerHa: number;
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
    marginTotal: 30,
    marginPerHa: 1539
  }
];

const structuralCosts = {
  'FRAIS DE PERSONNEL': [
    { name: 'Salaires et charges sur salaires', amount: 0 },
    { name: 'Charges sociales des Exploitants', amount: 0 }
  ],
  'FRAIS DE MÉCANISATION': [
    { name: 'Carburant', amount: 9405 },
    { name: 'Entretien du matériel', amount: 5000 },
    { name: 'Amortissements', amount: 39000 },
    { name: 'Leasing et travaux par tiers', amount: 28300 }
  ],
  'FRAIS BATIMENTS ET FONCIER': [
    { name: 'Fermages et impôts fonciers', amount: 15500 },
    { name: 'Entretien des bâtiments', amount: 2000 },
    { name: 'Amortissements des bâtiments', amount: 7500 }
  ],
  'FRAIS DIVERS': [
    { name: 'Eau/elec/gaz', amount: 2500 },
    { name: 'Compta/conseil tech/autres', amount: 4000 },
    { name: 'Assurances (cultures+rc)', amount: 5000 },
    { name: 'Transport (inter site)', amount: 1000 },
    { name: 'Frais financiers LMT', amount: 6000 },
    { name: 'Frais financiers CT', amount: 0 },
    { name: 'Frais financiers CCA', amount: 300 },
    { name: 'Divers', amount: 1000 }
  ]
};

const financialRatios = {
  'REVENU AGRICOLE': 6385,
  'Amortissements': 46500,
  'REVENU DISPONIBLE': 40115,
  'Prélèvements privés courants': 0,
  'Remboursement échéance': 48000,
  'CAPACITÉ D\'AUTOFINANCEMENT': 7885
};

export function FinancialDetailsPage() {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);
  
  const totalSurface = crops.reduce((sum, crop) => sum + crop.surface, 0);
  const totalProduct = crops.reduce((sum, crop) => sum + crop.productTotal, 0);
  const totalMargin = crops.reduce((sum, crop) => sum + crop.marginTotal, 0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/business-plan')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      {/* Marges Brutes par Culture */}
      <Card>
        <CardHeader>
          <CardTitle>Marges Brutes par Culture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Culture</th>
                  <th className="text-right p-2">Surface (ha)</th>
                  <th className="text-right p-2">Rendement</th>
                  <th className="text-right p-2">Prix net</th>
                  <th className="text-right p-2">Aides/ha</th>
                  <th className="text-right p-2">Produit k€</th>
                  <th className="text-right p-2">Produit €/ha</th>
                  <th className="text-right p-2">Marge k€</th>
                  <th className="text-right p-2">Marge €/ha</th>
                </tr>
              </thead>
              <tbody>
                {crops.map((crop) => (
                  <tr 
                    key={crop.name} 
                    className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/business-plan/financial-details/crop/${crop.name}`)}
                  >
                    <td className="p-2">{crop.name}</td>
                    <td className="text-right p-2">{formatNumber(crop.surface)}</td>
                    <td className="text-right p-2">{formatNumber(crop.yield)}</td>
                    <td className="text-right p-2">{formatNumber(crop.netPrice)}</td>
                    <td className="text-right p-2">{formatNumber(crop.subsidies)}</td>
                    <td className="text-right p-2">{formatNumber(crop.productTotal)}</td>
                    <td className="text-right p-2">{formatNumber(crop.productPerHa)}</td>
                    <td className="text-right p-2">{formatNumber(crop.marginTotal)}</td>
                    <td className="text-right p-2">{formatNumber(crop.marginPerHa)}</td>
                  </tr>
                ))}
                <tr className="font-medium bg-gray-50">
                  <td className="p-2">TOTAL</td>
                  <td className="text-right p-2">{formatNumber(totalSurface)}</td>
                  <td className="text-right p-2">-</td>
                  <td className="text-right p-2">-</td>
                  <td className="text-right p-2">-</td>
                  <td className="text-right p-2">{formatNumber(totalProduct)}</td>
                  <td className="text-right p-2">-</td>
                  <td className="text-right p-2">{formatNumber(totalMargin)}</td>
                  <td className="text-right p-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Charges de Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(structuralCosts).map(([category, items]) => {
              const categoryTotal = items.reduce((sum, item) => sum + item.amount, 0);
              return (
                <div key={category} className="space-y-2">
                  <h3 className="font-semibold">{category}</h3>
                  {items.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>{formatNumber(item.amount)} €</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total {category}</span>
                    <span>{formatNumber(categoryTotal)} €</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ratios Financiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Résultat</h3>
              {Object.entries(financialRatios).map(([label, value], index) => (
                <div key={label} className={`flex justify-between text-sm ${index === 2 || index === 5 ? 'font-semibold border-t pt-2' : ''}`}>
                  <span>{label}</span>
                  <span>{formatNumber(value)} €</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCrop && (
        <CropDetailView
          crop={selectedCrop}
          onClose={() => setSelectedCrop(null)}
        />
      )}
    </div>
  );
}
