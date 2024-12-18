import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

// Sample historical data - replace with actual data
const historicalData = {
  'Colza': [
    { year: 2020, yield: 3.0, price: 450, margin: 950 },
    { year: 2021, yield: 3.1, price: 470, margin: 980 },
    { year: 2022, yield: 3.2, price: 480, margin: 1000 },
    { year: 2023, yield: 3.2, price: 490, margin: 1028 },
    { year: 2024, yield: 3.3, price: 495, margin: 1050 },
  ],
  'Blé': [
    { year: 2020, yield: 7.0, price: 200, margin: 1100 },
    { year: 2021, yield: 7.1, price: 210, margin: 1150 },
    { year: 2022, yield: 7.2, price: 215, margin: 1170 },
    { year: 2023, yield: 7.3, price: 220, margin: 1198 },
    { year: 2024, yield: 7.4, price: 225, margin: 1220 },
  ],
  'Orge': [
    { year: 2020, yield: 6.3, price: 290, margin: 1400 },
    { year: 2021, yield: 6.4, price: 300, margin: 1450 },
    { year: 2022, yield: 6.5, price: 305, margin: 1500 },
    { year: 2023, yield: 6.6, price: 313, margin: 1539 },
    { year: 2024, yield: 6.7, price: 320, margin: 1580 },
  ],
};

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

export function CropDetailsPage() {
  const navigate = useNavigate();
  const { cropName } = useParams();
  
  const crop = crops.find(c => c.name === cropName);
  const cropHistory = historicalData[cropName as keyof typeof historicalData] || [];

  if (!crop) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/business-plan/financial-details')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
        <div>Culture non trouvée</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/business-plan/financial-details')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">{crop.name}</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Surface</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crop.surface} ha</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Rendement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crop.yield} t/ha</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Prix Net</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crop.netPrice}€/t</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Aides/ha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crop.subsidies}€</div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du Rendement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} t/ha`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="#8884d8" 
                    name="Rendement"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution du Prix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}€/t`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#82ca9d" 
                    name="Prix"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Margin Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution de la Marge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cropHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}€/ha`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="#ffc658" 
                  name="Marge"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé Financier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Produit Total</div>
              <div className="text-lg font-bold">{crop.productTotal}k€</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Produit/ha</div>
              <div className="text-lg font-bold">{crop.productPerHa}€/ha</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Marge Total</div>
              <div className="text-lg font-bold">{crop.marginTotal}k€</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Marge/ha</div>
              <div className="text-lg font-bold">{crop.marginPerHa}€/ha</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CropDetailsPage;
