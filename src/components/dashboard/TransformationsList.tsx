import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { TrendingUp, Sprout, LineChart, Users, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { strategicTransformations, nonStrategicTransformations } from './Transformation';
import { EkumenAssist } from './EkumenAssist';

export function TransformationsList() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('new');
  const [showAssistant, setShowAssistant] = useState(false);

  const allTransformations = [...strategicTransformations, ...nonStrategicTransformations];

  const transformationsByStatus = {
    new: strategicTransformations.filter(t => t.status === 'new'),
    ongoing: strategicTransformations.filter(t => t.status === 'ongoing'),
    'under-review': strategicTransformations.filter(t => t.status === 'under-review'),
    'under-consideration': strategicTransformations.filter(t => t.status === 'under-consideration'),
    'other': nonStrategicTransformations.map(t => ({ ...t, status: 'new' })), // Reset status for non-strategic transformations
  };

  // Function to get the status badge color
  const getStatusColor = (status: string, isStrategic: boolean) => {
    if (!isStrategic) return 'bg-gray-100 text-gray-700'; // Non-strategic transformations
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-700';
      case 'ongoing':
        return 'bg-blue-100 text-blue-700';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-700';
      case 'under-consideration':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex">
      {/* Main content - takes 2/3 or full width */}
      <div className={cn(
        "space-y-6",
        showAssistant ? "w-2/3 pr-6" : "w-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mes Transformations</h1>
            <p className="text-muted-foreground">
              Découvrez les transformations disponibles pour votre exploitation.
            </p>
          </div>
        </div>

        {/* Add Explore button */}
        <div className="flex justify-end mb-6">
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => setShowAssistant(true)}
          >
            Explorer les transformations
          </Button>
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
            <TabsTrigger value="under-review">En cours de validation</TabsTrigger>
            <TabsTrigger value="under-consideration">À l'étude</TabsTrigger>
            <TabsTrigger value="other">Autres transformations</TabsTrigger>
          </TabsList>

          {Object.entries(transformationsByStatus).map(([status, transformations]) => (
            <TabsContent key={status} value={status} className="space-y-4">
              <div className="grid gap-4">
                <h2 className="text-lg font-semibold tracking-tight">
                  {status === 'new' && 'Transformations alignées à vos objectifs'}
                  {status === 'ongoing' && 'Transformations en cours'}
                  {status === 'under-review' && 'Transformations en cours de validation'}
                  {status === 'under-consideration' && 'Transformations à l\'étude'}
                  {status === 'other' && 'Transformations hors objectifs stratégiques'}
                </h2>
                {status === 'other' && (
                  <p className="text-sm text-muted-foreground -mt-2">
                    Ces transformations ne sont pas directement alignées avec vos objectifs stratégiques actuels, 
                    mais pourraient présenter des opportunités intéressantes pour votre exploitation.
                  </p>
                )}
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
                                <div className="flex items-center gap-3">
                                  <CardTitle className="text-base font-medium">
                                    {transformation.title}
                                  </CardTitle>
                                  {status !== 'other' && (
                                    <Badge className={getStatusColor(transformation.status, true)}>
                                      {transformation.status === 'new' && 'Nouvelle'}
                                      {transformation.status === 'ongoing' && 'En cours'}
                                      {transformation.status === 'under-review' && 'En validation'}
                                      {transformation.status === 'under-consideration' && 'À l\'étude'}
                                    </Badge>
                                  )}
                                </div>
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
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Users className="h-4 w-4" />
                                    <span className="font-medium">{transformation.source}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Target className="h-4 w-4" />
                                    <span className="font-medium">{transformation.type}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="font-medium">{transformation.impact}</span>
                                  </div>
                                </div>
                              </div>
                              {/* Objectives */}
                              <div className="flex flex-wrap gap-2 mt-4">
                                {transformation.objectives.map((objective, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className={cn(
                                      'border-2',
                                      objective.color === 'green' && 'border-green-500 text-green-700',
                                      objective.color === 'blue' && 'border-blue-500 text-blue-700',
                                      objective.color === 'yellow' && 'border-yellow-500 text-yellow-700',
                                      objective.color === 'purple' && 'border-purple-500 text-purple-700'
                                    )}
                                  >
                                    {objective.label}
                                  </Badge>
                                ))}
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

      {/* Assistant - takes 1/3 width when shown */}
      {showAssistant && (
        <div className="w-1/3">
          <EkumenAssist onClose={() => setShowAssistant(false)} />
        </div>
      )}
    </div>
  );
}
