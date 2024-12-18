import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

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

interface CropDetailViewProps {
  crop: CropData;
  onClose: () => void;
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

export function CropDetailView({ crop, onClose }: CropDetailViewProps) {
  const cropHistory = historicalData[crop.name as keyof typeof historicalData] || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{crop.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>
    </div>
  );
}
