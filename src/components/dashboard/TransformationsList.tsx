import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { TrendingUp, Sprout, LineChart } from 'lucide-react';
import { strategicTransformations, nonStrategicTransformations } from './Transformation';

export function TransformationsList() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('new');

  const allTransformations = [...strategicTransformations, ...nonStrategicTransformations];

  const transformationsByStatus = {
    new: [strategicTransformations[1], nonStrategicTransformations[1]], // Diversification & Transition
    ongoing: [strategicTransformations[0], nonStrategicTransformations[2]], // Agriculture régénérative & Smart Farming
    'under-review': [nonStrategicTransformations[0]], // Agriculture de précision
    'under-consideration': [strategicTransformations[2]], // Coopérative agricole
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transformations</h1>
        <p className="text-muted-foreground">
          Découvrez les transformations disponibles pour votre exploitation.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <AnalyticsCard
          title="Rendement"
          value="+12%"
          description="Après 3 ans"
          icon={TrendingUp}
          trend="up"
        />
        <AnalyticsCard
          title="Revenus"
          value="+15%"
          description="D'amélioration du revenu net"
          icon={LineChart}
          trend="up"
        />
        <AnalyticsCard
          title="Environnement"
          value="A+"
          description="Biodiversité et sols positivement impactés"
          icon={Sprout}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="new" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="new">Nouvelles</TabsTrigger>
          <TabsTrigger value="ongoing">En cours</TabsTrigger>
          <TabsTrigger value="under-review">En revue</TabsTrigger>
          <TabsTrigger value="under-consideration">À l'étude</TabsTrigger>
        </TabsList>

        {Object.entries(transformationsByStatus).map(([status, transformations]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              <h2 className="text-lg font-semibold tracking-tight">
                {status === 'new' && 'Transformations alignées à vos objectifs'}
                {status === 'ongoing' && 'Transformations en cours'}
                {status === 'under-review' && 'Transformations en revue'}
                {status === 'under-consideration' && 'Transformations à l\'étude'}
              </h2>
              <div className="grid gap-4">
                {transformations.map((transformation) => (
                  <Card
                    key={transformation.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => navigate(`/transformations/${transformation.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {React.createElement(transformation.icon, {
                              className: "h-4 w-4 text-primary"
                            })}
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base font-medium">
                                {transformation.title}
                              </CardTitle>
                              <div className="text-right">
                                <div className="text-lg font-bold text-primary">
                                  {transformation.kpis.margin} €/ha
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Marge semi-nette
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {transformation.shortDesc}
                            </p>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                              <div className="flex items-center space-x-4">
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Source: </span>
                                  <span className="font-medium">{transformation.source}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Type: </span>
                                  <span className="font-medium">{transformation.type}</span>
                                </div>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Impact: </span>
                                <span className="font-medium">{transformation.impact}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
