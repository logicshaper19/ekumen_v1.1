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
  { year: 2024, impact: 0, costs: 0, revenue: 0, revenueWithTransformation: 0, revenueWithoutTransformation: 0, costsWithTransformation: 0, costsWithoutTransformation: 0, marginWithTransformation: 0, marginWithoutTransformation: 0 },
  { year: 2025, impact: 20, costs: -15000, revenue: 5000, revenueWithTransformation: 5500, revenueWithoutTransformation: 4500, costsWithTransformation: -12000, costsWithoutTransformation: -18000, marginWithTransformation: 3500, marginWithoutTransformation: 2700 },
  { year: 2026, impact: 45, costs: -8000, revenue: 10000, revenueWithTransformation: 11000, revenueWithoutTransformation: 9000, costsWithTransformation: -6000, costsWithoutTransformation: -10000, marginWithTransformation: 5000, marginWithoutTransformation: 4000 },
  { year: 2027, impact: 75, costs: 5000, revenue: 20000, revenueWithTransformation: 22000, revenueWithoutTransformation: 18000, costsWithTransformation: 7000, costsWithoutTransformation: 3000, marginWithTransformation: 15000, marginWithoutTransformation: 15000 },
  { year: 2028, impact: 100, costs: 25000, revenue: 30000, revenueWithTransformation: 33000, revenueWithoutTransformation: 27000, costsWithTransformation: 28000, costsWithoutTransformation: 22000, marginWithTransformation: 5000, marginWithoutTransformation: 5000 },
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
    description: "Communauté d'agriculteurs pour partager les meilleures pratiques",
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
  const { id, transformationId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState("overview");
  
  // Use transformationId if available (bank view) or id (farmer view)
  const transformationIdToUse = transformationId || id;
  const transformation = [...strategicTransformations, ...nonStrategicTransformations].find(t => t.id === transformationIdToUse);
  
  const isBankView = Boolean(transformationId); // If we have a transformation id, we're in bank view
  
  if (!transformation) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="text-xl font-medium text-muted-foreground">Transformation non trouvée</div>
        <Button variant="outline" onClick={() => navigate(isBankView ? `/agriculteurs/${id}` : '/transformations')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isBankView ? "Retour au profil" : "Retour aux transformations"}
        </Button>
      </div>
    );
  }

  const handleAnalysisClick = () => {
    setSelectedTab("details");
  };

  return (
    <div className="p-8 space-y-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(isBankView ? `/agriculteurs/${id}` : '/transformations')} 
        className="mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {isBankView ? "Retour au profil" : "Retour aux transformations"}
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <transformation.icon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{transformation.title}</h1>
            <p className="text-muted-foreground mt-1">{transformation.description}</p>
          </div>
        </div>
        
        {/* Status-specific actions */}
        <div className="flex items-center gap-4">
          {transformation.status === 'new' && (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => {}}>
                <Users className="h-4 w-4 mr-2" />
                Partager
              </Button>
              <Button variant="default" onClick={() => {}}>
                Sauvegarder
              </Button>
            </div>
          )}
          
          {transformation.status === 'under-review' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <span className="font-medium">En revue par:</span>
                <span>{transformation.reviewer?.name} ({transformation.reviewer?.organization})</span>
              </div>
            </div>
          )}
          
          {transformation.status === 'under-consideration' && (
            <Button variant="outline" onClick={() => {}}>
              <Users className="h-4 w-4 mr-2" />
              Partager avec partenaires
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Cette transformation vise à {transformation.description.toLowerCase()} en adoptant des pratiques agricoles innovantes et durables. 
              Elle permet d'optimiser vos rendements tout en réduisant votre impact environnemental grâce à {transformation.mainBenefit}. 
              La mise en œuvre s'étale sur {transformation.implementationTime} avec un retour sur investissement prévu dès la {transformation.roiTime}.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="details">Analyse détaillée</TabsTrigger>
          <TabsTrigger value="action">Plan d'action</TabsTrigger>
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
                <p className="text-sm text-muted-foreground">
                  Comparaison entre l'adoption de la transformation et le statu quo sur 5 ans
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Economic Performance */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      Performance économique
                    </h3>
                    <div className="grid gap-4">
                      <div className="relative p-4 rounded-lg border">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-muted-foreground">
                          Rendement
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-primary">+{transformation.kpis.yield}%</div>
                            <p className="text-sm text-muted-foreground">Avec transformation</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-muted-foreground">0%</div>
                            <p className="text-sm text-muted-foreground">Sans changement</p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Gain potentiel: <span className="font-medium text-primary">+{transformation.kpis.yield}%</span>
                        </div>
                      </div>

                      <div className="relative p-4 rounded-lg border">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-muted-foreground">
                          Marge semi-nette
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {transformation.kpis.margin > 0 ? '+' : ''}{transformation.kpis.margin}%
                            </div>
                            <p className="text-sm text-muted-foreground">Avec transformation</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-muted-foreground">0%</div>
                            <p className="text-sm text-muted-foreground">Sans changement</p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Gain potentiel: <span className="font-medium text-primary">{transformation.kpis.margin > 0 ? '+' : ''}{transformation.kpis.margin}%</span>
                        </div>
                      </div>

                      <div className="relative p-4 rounded-lg border">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-muted-foreground">
                          Coûts de production
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {transformation.kpis.costs < 0 ? '' : '+'}{transformation.kpis.costs}%
                            </div>
                            <p className="text-sm text-muted-foreground">Avec transformation</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-muted-foreground">0%</div>
                            <p className="text-sm text-muted-foreground">Sans changement</p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Impact: <span className={`font-medium ${transformation.kpis.costs < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transformation.kpis.costs < 0 ? '' : '+'}{transformation.kpis.costs}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Leaf className="h-4 w-4 text-primary" />
                      </div>
                      Impact environnemental
                    </h3>
                    <div className="grid gap-4">
                      <div className="relative p-4 rounded-lg border">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-muted-foreground">
                          Émissions de GES
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-green-600">
                              {transformation.kpis.emissions < 0 ? '' : '+'}{transformation.kpis.emissions}%
                            </div>
                            <p className="text-sm text-muted-foreground">Avec transformation</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-muted-foreground">0%</div>
                            <p className="text-sm text-muted-foreground">Sans changement</p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Réduction: <span className="font-medium text-green-600">
                            {Math.abs(transformation.kpis.emissions)}%
                          </span>
                        </div>
                      </div>

                      <div className="relative p-4 rounded-lg border">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-muted-foreground">
                          Biodiversité
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              +{transformation.kpis.biodiversity}%
                            </div>
                            <p className="text-sm text-muted-foreground">Avec transformation</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-muted-foreground">0%</div>
                            <p className="text-sm text-muted-foreground">Sans changement</p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Amélioration: <span className="font-medium text-primary">+{transformation.kpis.biodiversity}%</span>
                        </div>
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

        {/* Detailed Analysis Tab */}
        <TabsContent value="details" className="space-y-8">
          {/* 5-Year Simulation */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation sur 5 ans</CardTitle>
              <p className="text-sm text-muted-foreground">
                Comparaison de l'évolution financière avec et sans la transformation
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Revenue Chart */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Revenus (€/ha)</h4>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={simulationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-sm">
                                  <p className="font-medium">Année {label}</p>
                                  <p className="text-primary">
                                    Avec transformation: {payload[0].value}€/ha
                                  </p>
                                  <p className="text-muted-foreground">
                                    Sans changement: {payload[1].value}€/ha
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenueWithTransformation"
                          name="Avec transformation"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenueWithoutTransformation"
                          name="Sans changement"
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          dot={{ r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Costs Chart */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Coûts de production (€/ha)</h4>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={simulationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-sm">
                                  <p className="font-medium">Année {label}</p>
                                  <p className="text-primary">
                                    Avec transformation: {payload[0].value}€/ha
                                  </p>
                                  <p className="text-muted-foreground">
                                    Sans changement: {payload[1].value}€/ha
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="costsWithTransformation"
                          name="Avec transformation"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="costsWithoutTransformation"
                          name="Sans changement"
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          dot={{ r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Net Margin Chart */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Marge nette (€/ha)</h4>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={simulationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-sm">
                                  <p className="font-medium">Année {label}</p>
                                  <p className="text-primary">
                                    Avec transformation: {payload[0].value}€/ha
                                  </p>
                                  <p className="text-muted-foreground">
                                    Sans changement: {payload[1].value}€/ha
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="marginWithTransformation"
                          name="Avec transformation"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="marginWithoutTransformation"
                          name="Sans changement"
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          dot={{ r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Action Plan Tab */}
        <TabsContent value="action" className="space-y-8">
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
                {transformation.steps.map((step: string, index: number) => (
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
