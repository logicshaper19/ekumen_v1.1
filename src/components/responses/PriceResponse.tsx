import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface PriceData {
  region: string;
  fourragerPrice: number;
  brasseriePrice: number;
}

const currentPrices: PriceData[] = [
  { region: 'États-Unis', fourragerPrice: 230, brasseriePrice: 340 },
  { region: 'Canada', fourragerPrice: 220, brasseriePrice: 330 },
  { region: 'UE', fourragerPrice: 260, brasseriePrice: 370 },
];

const forecastData = [
  { month: 'Jan', price: 260 },
  { month: 'Fév', price: 265 },
  { month: 'Mars', price: 270 },
  { month: 'Avr', price: 280 },
];

export function PriceResponse() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-6">Prix de l'Orge - Analyse de Marché</h2>

        <h3 className="text-xl font-semibold mt-8 mb-4">Prix Actuels du Marché</h3>
        <div className="h-[300px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentPrices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar name="Orge Fourragère (€/tonne)" dataKey="fourragerPrice" fill="#0d9488" />
              <Bar name="Orge de Brasserie (€/tonne)" dataKey="brasseriePrice" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Prévisions des Prix</h3>
        <div className="h-[300px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                name="Prix Prévisionnel (€/tonne)"
                dataKey="price" 
                stroke="#0d9488" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Facteurs Clés Influençant les Prix</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Offre Mondiale</h4>
            <p className="text-gray-600">Réductions potentielles de rendement en Australie et Europe pouvant resserrer l'offre.</p>
          </Card>
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Tendances de la Demande</h4>
            <p className="text-gray-600">Demande croissante pour les protéines végétales et biocarburants.</p>
          </Card>
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Coûts de l'Énergie</h4>
            <p className="text-gray-600">Fluctuations des prix du carburant affectant les coûts de transport.</p>
          </Card>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Recommandations</h3>
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Vendre maintenant</h4>
              <p className="text-gray-600">Prix actuels favorables si contraintes de stockage ou besoin de liquidités.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Attendre la récolte</h4>
              <p className="text-gray-600">Potentiel de rendements plus élevés si capacité de stockage disponible.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" className="w-32">Non</Button>
          <Button className="w-32">Oui</Button>
        </div>
      </div>
    </div>
  );
}
