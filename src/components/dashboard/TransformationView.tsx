import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  ChevronRight,
  Users,
  FileText,
  TrendingUp,
  Euro,
  Building,
  GraduationCap,
} from 'lucide-react';
import { strategicTransformations, nonStrategicTransformations } from './Transformation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data from TransformationExploration
const simulationData = [
  { year: 2024, impact: 0, costs: 0 },
  { year: 2025, impact: 20, costs: -15000 },
  { year: 2026, impact: 45, costs: -8000 },
  { year: 2027, impact: 75, costs: 5000 },
  { year: 2028, impact: 100, costs: 25000 },
];

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

export function TransformationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const transformation = [...strategicTransformations, ...nonStrategicTransformations].find(t => t.id === Number(id));
  
  if (!transformation) {
    return <div>Transformation non trouvée</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Back button */}
      <Button variant="ghost" onClick={() => navigate('/transformation')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <transformation.icon className="h-8 w-8" />
          {transformation.title}
        </h1>
        <p className="text-muted-foreground mt-1">{transformation.description}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="analysis">Analyse détaillée</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Benefits and KPIs */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Bénéfices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {transformation.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* KPIs */}
            <Card>
              <CardHeader>
                <CardTitle>Indicateurs clés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {transformation.kpis.map((kpi, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <kpi.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{kpi.title}</div>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Étapes de mise en œuvre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transformation.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-8">
          {/* 5-Year Simulation */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation sur 5 ans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
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
                      name="Impact (%)"
                      stroke="#4f46e5"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="costs"
                      name="Coûts (€)"
                      stroke="#10b981"
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
                {partners.map(partner => (
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
                    <p className="text-sm text-muted-foreground">{partner.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Ressources disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
