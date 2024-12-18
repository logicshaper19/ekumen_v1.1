import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  Clock,
  Leaf,
  Sprout,
  LineChart,
  CheckCircle,
  Check,
  ArrowRight,
} from 'lucide-react';
import { strategicTransformations, nonStrategicTransformations } from './Transformation';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Mock data from TransformationExploration
const simulationData = [
  { year: 2024, impact: 0, costs: 0, revenue: 0 },
  { year: 2025, impact: 20, costs: -15000, revenue: 5000 },
  { year: 2026, impact: 45, costs: -8000, revenue: 10000 },
  { year: 2027, impact: 75, costs: 5000, revenue: 20000 },
  { year: 2028, impact: 100, costs: 25000, revenue: 30000 },
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
  const [selectedTab, setSelectedTab] = React.useState("overview");
  
  const transformation = [...strategicTransformations, ...nonStrategicTransformations].find(t => t.id === Number(id));
  
  if (!transformation) {
    return <div>Transformation non trouvée</div>;
  }

  const handleAnalysisClick = () => {
    setSelectedTab("details");
  };

  return (
    <div className="p-8 space-y-8">
      {/* Back button */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <transformation.icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{transformation.title}</h1>
          <p className="text-muted-foreground mt-1">{transformation.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="details">Analyse détaillée</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Benefits and KPIs */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* KPIs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                  Indicateurs clés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Economic Performance */}
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      Performance économique
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Rendement</span>
                        <span className="font-medium">+{transformation.kpis.yield}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Marge semi-nette</span>
                        <span className="font-medium">{transformation.kpis.margin} €/ha</span>
                      </div>
                    </div>
                  </div>

                  {/* Working Time */}
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      Temps de travail
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Heures/ha</span>
                      <span className="font-medium">{transformation.kpis.workingTime} h/ha</span>
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Leaf className="h-4 w-4 text-primary" />
                      </div>
                      Impact environnemental
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Émissions GES</span>
                        <span className="font-medium">{transformation.kpis.gesEmissions} CO²e/ha</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Lixiviation</span>
                        <span className="font-medium">{transformation.kpis.lixiviation} kg N/ha</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Émissions N₂O</span>
                        <span className="font-medium">{transformation.kpis.n2oEmissions} kg N₂O/ha</span>
                      </div>
                    </div>
                  </div>

                  {/* Soil Quality */}
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Sprout className="h-4 w-4 text-primary" />
                      </div>
                      Qualité du sol
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Indice de qualité</span>
                        <span className="font-medium">{transformation.kpis.soilQuality}/10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Matière organique</span>
                        <span className="font-medium">{transformation.kpis.organicMatter}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Biodiversité</span>
                        <span className="font-medium">{transformation.kpis.biodiversity}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  Bénéfices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ul className="space-y-3">
                    {transformation.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end">
                    <Button
                      variant="default"
                      className="bg-primary hover:bg-primary/90"
                      onClick={handleAnalysisClick}
                    >
                      Voir l'analyse détaillée
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="details" className="space-y-8">
          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Étapes de mise en œuvre</CardTitle>
              <p className="text-muted-foreground">
                La transition vers {transformation.title.toLowerCase()} nécessite une approche structurée. 
                Voici les étapes clés pour assurer une mise en œuvre réussie de cette transformation.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {transformation.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 5-Year Simulation */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation sur 5 ans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={simulationData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
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
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenu (€/ha)"
                      stroke="#10b981"
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
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
