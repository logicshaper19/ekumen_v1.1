import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ChevronRight, ArrowRight, TrendingUp, Clock, Leaf, Sprout } from 'lucide-react';
import { strategicTransformations, nonStrategicTransformations } from './Transformation';

export function TransformationDetails() {
  const params = useParams();
  const navigate = useNavigate();
  
  const id = Number(params.id);
  const transformation = [...strategicTransformations, ...nonStrategicTransformations].find(t => t.id === id);
  
  if (!transformation) {
    return <div>Transformation non trouvée</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/transformation')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <transformation.icon className="h-8 w-8" />
            {transformation.title}
          </h1>
          <p className="text-muted-foreground mt-1">{transformation.description}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="detailed">Analyse détaillée</TabsTrigger>
          <TabsTrigger value="action">Plan d'action</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{transformation.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Bénéfices clés</h3>
                  <ul className="space-y-2">
                    {transformation.benefits.slice(0, 3).map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Indicateurs principaux</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Rendement</p>
                      <p className="text-lg font-semibold">+{transformation.kpis.yield}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Marge</p>
                      <p className="text-lg font-semibold">{transformation.kpis.margin} €/ha</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Impact GES</p>
                      <p className="text-lg font-semibold">{transformation.kpis.gesEmissions} CO²e/ha</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analyse détaillée */}
        <TabsContent value="detailed" className="space-y-8">
          <div className="grid gap-8">
            {/* Benefits and KPIs */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column - Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Bénéfices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {transformation.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Right column - KPIs */}
              <Card>
                <CardHeader>
                  <CardTitle>Indicateurs clés</CardTitle>
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
            </div>
          </div>
        </TabsContent>

        {/* Plan d'action */}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
