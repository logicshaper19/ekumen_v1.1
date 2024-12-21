import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { TrendingUp, Sprout, LineChart, Users, Target, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { strategicTransformations, nonStrategicTransformations } from './Transformation';
import { EkumenAssist } from './EkumenAssist';

export interface TransformationsListProps {
  isBankView?: boolean;
  farmerId?: string;
  showOnlyOngoing?: boolean;
}

export function TransformationCard({ transformation, isBankView = false, farmerId = undefined }) {
  const navigate = useNavigate();
  const getStatusColor = (status: string, isStrategic: boolean) => {
    if (!isStrategic) return 'bg-gray-100 text-gray-700';
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

  const handleClick = () => {
    const baseUrl = isBankView ? `/agriculteurs/${farmerId}/transformations` : '/transformations';
    navigate(`${baseUrl}/${transformation.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium">{transformation.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{transformation.shortDesc}</p>
          </div>
        </div>
        <Badge 
          variant="secondary"
          className={cn(
            getStatusColor(transformation.status, transformation.type === 'Stratégique'),
            'whitespace-nowrap'
          )}
        >
          {transformation.status === 'ongoing' ? 'En cours' : transformation.status}
        </Badge>
      </div>
      <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          <span>{transformation.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{transformation.source}</span>
        </div>
      </div>
    </div>
  );
}

export function TransformationsList({ isBankView = false, farmerId, showOnlyOngoing = false }: TransformationsListProps) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('ongoing');
  const [showAssistant, setShowAssistant] = useState(false);

  const allTransformations = [...strategicTransformations, ...nonStrategicTransformations];

  const transformationsByStatus = {
    new: strategicTransformations.filter(t => t.status === 'new'),
    ongoing: strategicTransformations.filter(t => t.status === 'ongoing'),
    'under-review': strategicTransformations.filter(t => t.status === 'under-review'),
    'under-consideration': strategicTransformations.filter(t => t.status === 'under-consideration'),
    'other': nonStrategicTransformations.map(t => ({ ...t, status: 'new' })),
  };

  // Function to get the status badge color
  const getStatusColor = (status: string, isStrategic: boolean) => {
    if (!isStrategic) return 'bg-gray-100 text-gray-700';
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

  const handleTransformationClick = (transformation: any) => {
    const baseUrl = isBankView ? `/agriculteurs/${farmerId}/transformations` : '/transformations';
    navigate(`${baseUrl}/${transformation.id}`);
  };

  return (
    <div className="flex">
      <div className={cn(
        "space-y-6",
        showAssistant ? "w-2/3 pr-6" : "w-full"
      )}>
        {/* Header */}
        {!showOnlyOngoing && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {isBankView ? "Transformations de l'exploitation" : "Mes Transformations"}
                </h1>
                <p className="text-muted-foreground">
                  {isBankView 
                    ? "Suivez les transformations en cours sur cette exploitation."
                    : "Découvrez les transformations disponibles pour votre exploitation."
                  }
                </p>
              </div>
            </div>

            {/* Add Explore button - only show in farmer view */}
            {!isBankView && (
              <div className="flex justify-end mb-6">
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setShowAssistant(true)}
                >
                  Explorer les transformations
                </Button>
              </div>
            )}

            {/* KPIs - only show in farmer view */}
            {!isBankView && (
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
            )}
          </>
        )}

        {/* Tabs */}
        {!showOnlyOngoing && (
          <Tabs defaultValue={selectedTab} className="space-y-4" onValueChange={setSelectedTab}>
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
                        onClick={() => handleTransformationClick(transformation)}
                      >
                        <CardContent className="p-6">
                          {/* Existing card content */}
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
        )}

        {/* Show only ongoing transformations if showOnlyOngoing is true */}
        {showOnlyOngoing && (
          <div className="grid gap-4">
            {transformationsByStatus.ongoing.map((transformation) => (
              <Card
                key={transformation.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleTransformationClick(transformation)}
              >
                <CardContent className="p-6">
                  {/* Same card content as above */}
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
                            <Badge className={getStatusColor('ongoing', true)}>
                              En cours
                            </Badge>
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
        )}
      </div>

      {/* Assistant - only show in farmer view */}
      {showAssistant && !isBankView && (
        <div className="w-1/3">
          <EkumenAssist onClose={() => setShowAssistant(false)} />
        </div>
      )}
    </div>
  );
}
