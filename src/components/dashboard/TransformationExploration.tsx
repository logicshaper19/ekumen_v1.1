import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Users,
  FileText,
  TrendingUp,
  Euro,
  Building,
  GraduationCap,
} from 'lucide-react';
import { transformations } from './Transformation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the 5-year simulation
const simulationData = [
  { year: 2024, impact: 0, costs: 0 },
  { year: 2025, impact: 20, costs: -15000 },
  { year: 2026, impact: 45, costs: -8000 },
  { year: 2027, impact: 75, costs: 5000 },
  { year: 2028, impact: 100, costs: 25000 },
];

// Mock data for partners
const partners = [
  {
    id: 1,
    name: "Chambre d'Agriculture",
    type: "Accompagnement technique",
    icon: GraduationCap,
    description: "Expertise et conseil pour la transition"
  },
  {
    id: 2,
    name: "BioFrance",
    type: "Certification",
    icon: Building,
    description: "Organisme certificateur agréé"
  },
  {
    id: 3,
    name: "AgroFinance",
    type: "Financement",
    icon: Euro,
    description: "Solutions de financement adaptées"
  }
];

// Mock data for resources
const resources = [
  {
    title: "Guide complet de transition",
    type: "PDF",
    icon: FileText,
    url: "#"
  },
  {
    title: "Réseau d'agriculteurs",
    type: "Communauté",
    icon: Users,
    url: "#"
  },
  {
    title: "Études d'impact",
    type: "Rapport",
    icon: TrendingUp,
    url: "#"
  }
];

export function TransformationExploration() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const transformation = transformations.find(t => t.id === Number(id));
  
  if (!transformation) {
    return <div>Transformation non trouvée</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(`/transformation/${id}/details`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <transformation.icon className="h-8 w-8" />
            Exploration: {transformation.title}
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyse détaillée de l'impact et des ressources nécessaires
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description détaillée</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {transformation.description}
            </p>
          </CardContent>
        </Card>

        {/* Impact Simulation */}
        <Card>
          <CardHeader>
            <CardTitle>Simulation sur 5 ans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="impact"
                    name="Impact environnemental (%)"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="costs"
                    name="Impact financier (€)"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Partners */}
        <Card>
          <CardHeader>
            <CardTitle>Partenaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <div key={partner.id} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <partner.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-muted-foreground">{partner.type}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Ressources additionnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <resource.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{resource.title}</div>
                    <div className="text-sm text-muted-foreground">{resource.type}</div>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="flex justify-end">
          <Button 
            size="lg"
            className="gap-2"
          >
            Démarrer cette transformation
          </Button>
        </div>
      </div>
    </div>
  );
}
