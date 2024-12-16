import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface CostItem {
  category: string;
  items: {
    name: string;
    amount: number;
    date?: string;
    notes?: string;
  }[];
}

// This would come from your database in a real app
const cropDetails = {
  'Colza': {
    surface: 12,
    yield: 3.2,
    netPrice: 490,
    subsidies: 190,
    productTotal: 21,
    productPerHa: 1782,
    costs: [
      {
        category: 'Intrants',
        items: [
          { name: 'Semences', amount: 72, date: '2024-02-15', notes: 'Variété DK Exception' },
          { name: 'Engrais de fond', amount: 180, date: '2024-02-20', notes: '18-46' },
          { name: 'Azote', amount: 192, date: '2024-03-10', notes: 'Solution azotée 39%' },
          { name: 'Herbicides', amount: 120, date: '2024-03-15' },
          { name: 'Fongicides', amount: 95, date: '2024-04-01' },
          { name: 'Insecticides', amount: 95, date: '2024-04-15' },
        ]
      },
      {
        category: 'Mécanisation',
        items: [
          { name: 'Labour', amount: 85, date: '2024-02-10' },
          { name: 'Semis', amount: 45, date: '2024-02-15' },
          { name: 'Pulvérisation', amount: 35, date: '2024-03-15' },
          { name: 'Fertilisation', amount: 40, date: '2024-03-10' },
          { name: 'Récolte', amount: 130, date: '2024-07-15' },
        ]
      },
      {
        category: 'Main d\'œuvre',
        items: [
          { name: 'Surveillance cultures', amount: 25, date: '2024-03-01' },
          { name: 'Travaux divers', amount: 35, date: '2024-04-01' },
        ]
      }
    ],
    timeline: [
      { date: '2024-02-10', event: 'Labour', type: 'work' },
      { date: '2024-02-15', event: 'Semis', type: 'work' },
      { date: '2024-02-20', event: 'Fertilisation de fond', type: 'input' },
      { date: '2024-03-10', event: 'Apport azote', type: 'input' },
      { date: '2024-03-15', event: 'Traitement herbicide', type: 'treatment' },
      { date: '2024-04-01', event: 'Traitement fongicide', type: 'treatment' },
      { date: '2024-04-15', event: 'Traitement insecticide', type: 'treatment' },
      { date: '2024-07-15', event: 'Récolte', type: 'work' },
    ]
  },
  'Blé': {
    surface: 25,
    yield: 7.5,
    netPrice: 220,
    subsidies: 170,
    productTotal: 41,
    productPerHa: 1650,
    costs: [
      {
        category: 'Intrants',
        items: [
          { name: 'Semences', amount: 65, date: '2024-10-15', notes: 'Variété Apache' },
          { name: 'Engrais de fond', amount: 160, date: '2024-10-20', notes: '18-46' },
          { name: 'Azote', amount: 210, date: '2024-02-25', notes: 'Solution azotée 39%' },
          { name: 'Herbicides', amount: 90, date: '2024-11-15' },
          { name: 'Fongicides', amount: 120, date: '2024-04-10' },
          { name: 'Régulateur', amount: 35, date: '2024-04-01' },
        ]
      },
      {
        category: 'Mécanisation',
        items: [
          { name: 'Labour', amount: 85, date: '2024-10-10' },
          { name: 'Semis', amount: 45, date: '2024-10-15' },
          { name: 'Pulvérisation', amount: 35, date: '2024-11-15' },
          { name: 'Fertilisation', amount: 40, date: '2024-02-25' },
          { name: 'Récolte', amount: 130, date: '2024-07-25' },
        ]
      },
      {
        category: 'Main d\'œuvre',
        items: [
          { name: 'Surveillance cultures', amount: 25, date: '2024-03-15' },
          { name: 'Travaux divers', amount: 35, date: '2024-04-15' },
        ]
      }
    ],
    timeline: [
      { date: '2024-10-10', event: 'Labour', type: 'work' },
      { date: '2024-10-15', event: 'Semis', type: 'work' },
      { date: '2024-10-20', event: 'Fertilisation de fond', type: 'input' },
      { date: '2024-11-15', event: 'Traitement herbicide', type: 'treatment' },
      { date: '2024-02-25', event: 'Apport azote', type: 'input' },
      { date: '2024-04-01', event: 'Application régulateur', type: 'treatment' },
      { date: '2024-04-10', event: 'Traitement fongicide', type: 'treatment' },
      { date: '2024-07-25', event: 'Récolte', type: 'work' },
    ]
  },
  'Orge': {
    surface: 18,
    yield: 6.8,
    netPrice: 190,
    subsidies: 170,
    productTotal: 32,
    productPerHa: 1462,
    costs: [
      {
        category: 'Intrants',
        items: [
          { name: 'Semences', amount: 60, date: '2024-10-20', notes: 'Variété Etincel' },
          { name: 'Engrais de fond', amount: 150, date: '2024-10-25', notes: '18-46' },
          { name: 'Azote', amount: 180, date: '2024-02-20', notes: 'Solution azotée 39%' },
          { name: 'Herbicides', amount: 85, date: '2024-11-20' },
          { name: 'Fongicides', amount: 110, date: '2024-04-05' },
          { name: 'Régulateur', amount: 35, date: '2024-03-25' },
        ]
      },
      {
        category: 'Mécanisation',
        items: [
          { name: 'Labour', amount: 85, date: '2024-10-15' },
          { name: 'Semis', amount: 45, date: '2024-10-20' },
          { name: 'Pulvérisation', amount: 35, date: '2024-11-20' },
          { name: 'Fertilisation', amount: 40, date: '2024-02-20' },
          { name: 'Récolte', amount: 130, date: '2024-07-10' },
        ]
      },
      {
        category: 'Main d\'œuvre',
        items: [
          { name: 'Surveillance cultures', amount: 25, date: '2024-03-10' },
          { name: 'Travaux divers', amount: 35, date: '2024-04-10' },
        ]
      }
    ],
    timeline: [
      { date: '2024-10-15', event: 'Labour', type: 'work' },
      { date: '2024-10-20', event: 'Semis', type: 'work' },
      { date: '2024-10-25', event: 'Fertilisation de fond', type: 'input' },
      { date: '2024-11-20', event: 'Traitement herbicide', type: 'treatment' },
      { date: '2024-02-20', event: 'Apport azote', type: 'input' },
      { date: '2024-03-25', event: 'Application régulateur', type: 'treatment' },
      { date: '2024-04-05', event: 'Traitement fongicide', type: 'treatment' },
      { date: '2024-07-10', event: 'Récolte', type: 'work' },
    ]
  },
  'Maïs': {
    surface: 15,
    yield: 9.2,
    netPrice: 185,
    subsidies: 170,
    productTotal: 35,
    productPerHa: 1702,
    costs: [
      {
        category: 'Intrants',
        items: [
          { name: 'Semences', amount: 180, date: '2024-04-15', notes: 'Variété DKC4391' },
          { name: 'Engrais de fond', amount: 170, date: '2024-04-10', notes: '18-46' },
          { name: 'Azote', amount: 220, date: '2024-05-15', notes: 'Solution azotée 39%' },
          { name: 'Herbicides', amount: 95, date: '2024-05-20' },
          { name: 'Insecticides', amount: 45, date: '2024-06-10' },
        ]
      },
      {
        category: 'Mécanisation',
        items: [
          { name: 'Labour', amount: 85, date: '2024-04-05' },
          { name: 'Semis', amount: 55, date: '2024-04-15' },
          { name: 'Pulvérisation', amount: 35, date: '2024-05-20' },
          { name: 'Fertilisation', amount: 40, date: '2024-05-15' },
          { name: 'Récolte', amount: 150, date: '2024-10-15' },
        ]
      },
      {
        category: 'Main d\'œuvre',
        items: [
          { name: 'Surveillance cultures', amount: 25, date: '2024-06-01' },
          { name: 'Travaux divers', amount: 35, date: '2024-07-01' },
        ]
      }
    ],
    timeline: [
      { date: '2024-04-05', event: 'Labour', type: 'work' },
      { date: '2024-04-10', event: 'Fertilisation de fond', type: 'input' },
      { date: '2024-04-15', event: 'Semis', type: 'work' },
      { date: '2024-05-15', event: 'Apport azote', type: 'input' },
      { date: '2024-05-20', event: 'Traitement herbicide', type: 'treatment' },
      { date: '2024-06-10', event: 'Traitement insecticide', type: 'treatment' },
      { date: '2024-10-15', event: 'Récolte', type: 'work' },
    ]
  },
  'Tournesol': {
    surface: 10,
    yield: 2.8,
    netPrice: 420,
    subsidies: 170,
    productTotal: 18,
    productPerHa: 1344,
    costs: [
      {
        category: 'Intrants',
        items: [
          { name: 'Semences', amount: 85, date: '2024-04-20', notes: 'Variété ES Romantic' },
          { name: 'Engrais de fond', amount: 140, date: '2024-04-15', notes: '18-46' },
          { name: 'Azote', amount: 150, date: '2024-05-20', notes: 'Solution azotée 39%' },
          { name: 'Herbicides', amount: 75, date: '2024-05-25' },
          { name: 'Fongicides', amount: 65, date: '2024-06-15' },
        ]
      },
      {
        category: 'Mécanisation',
        items: [
          { name: 'Labour', amount: 85, date: '2024-04-10' },
          { name: 'Semis', amount: 45, date: '2024-04-20' },
          { name: 'Pulvérisation', amount: 35, date: '2024-05-25' },
          { name: 'Fertilisation', amount: 40, date: '2024-05-20' },
          { name: 'Récolte', amount: 130, date: '2024-09-15' },
        ]
      },
      {
        category: 'Main d\'œuvre',
        items: [
          { name: 'Surveillance cultures', amount: 25, date: '2024-06-01' },
          { name: 'Travaux divers', amount: 35, date: '2024-07-01' },
        ]
      }
    ],
    timeline: [
      { date: '2024-04-10', event: 'Labour', type: 'work' },
      { date: '2024-04-15', event: 'Fertilisation de fond', type: 'input' },
      { date: '2024-04-20', event: 'Semis', type: 'work' },
      { date: '2024-05-20', event: 'Apport azote', type: 'input' },
      { date: '2024-05-25', event: 'Traitement herbicide', type: 'treatment' },
      { date: '2024-06-15', event: 'Traitement fongicide', type: 'treatment' },
      { date: '2024-09-15', event: 'Récolte', type: 'work' },
    ]
  }
};

export function CropDetailsPage() {
  const navigate = useNavigate();
  const { cropName } = useParams<{ cropName: string }>();
  
  if (!cropName || !cropDetails[cropName as keyof typeof cropDetails]) {
    return <div>Culture non trouvée</div>;
  }

  const crop = cropDetails[cropName as keyof typeof cropDetails];
  
  // Calculate totals
  const totalCosts = crop.costs.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.amount, 0), 
    0
  );

  const marginPerHa = crop.productPerHa - (totalCosts / crop.surface);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{cropName}</h1>
          <p className="text-muted-foreground">Analyse détaillée des coûts et de la performance</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/business-plan/financial-plan-details')}
        >
          Retour au Plan Financier
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#F5F5F0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Surface</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crop.surface} ha</div>
          </CardContent>
        </Card>
        <Card className="bg-[#F5F5F0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crop.yield} t/ha</div>
          </CardContent>
        </Card>
        <Card className="bg-[#F5F5F0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prix net</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crop.netPrice} €/t</div>
          </CardContent>
        </Card>
        <Card className="bg-[#F5F5F0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marge/ha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(marginPerHa)} €</div>
          </CardContent>
        </Card>
      </div>

      {/* Costs and Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Detailed Costs */}
        <Card className="md:col-span-4 bg-[#F5F5F0]">
          <CardHeader>
            <CardTitle>Détail des Charges</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div className="space-y-6">
              {crop.costs.map((category) => (
                <div key={category.category}>
                  <h3 className="text-lg font-medium mb-4">{category.category}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Montant/ha</TableHead>
                        <TableHead>Montant Total</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.items.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.date || '-'}</TableCell>
                          <TableCell>{Math.round(item.amount)} €</TableCell>
                          <TableCell>{Math.round(item.amount * crop.surface)} €</TableCell>
                          <TableCell>{item.notes || '-'}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-medium">
                        <TableCell>Total {category.category}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          {Math.round(
                            category.items.reduce((sum, item) => sum + item.amount, 0)
                          )} €
                        </TableCell>
                        <TableCell>
                          {Math.round(
                            category.items.reduce((sum, item) => sum + item.amount, 0) * crop.surface
                          )} €
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="md:col-span-1 bg-[#F5F5F0]">
          <CardHeader>
            <CardTitle>Calendrier des Interventions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gray-200"></div>
              <div className="space-y-4 ml-6">
                {crop.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[1.625rem] w-4 h-4 rounded-full mt-1.5 
                      ${event.type === 'work' ? 'bg-blue-500' : 
                        event.type === 'input' ? 'bg-green-500' : 'bg-orange-500'}`}>
                    </div>
                    <div className="bg-white p-3 rounded-lg border text-sm">
                      <div className="text-gray-500 text-xs">{event.date}</div>
                      <div className="font-medium">{event.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
