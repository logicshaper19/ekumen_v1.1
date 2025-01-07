import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { TrendingUp, Sprout, LineChart, Users, Target, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { strategicTransformations, nonStrategicTransformations } from '../../dashboard/Transformation';
import { EkumenAssist } from '../../dashboard/EkumenAssist';
import { TransformationCard } from '../../dashboard/TransformationsList';

export function TransformationsSection() {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Transformations</h2>
          <p className="text-muted-foreground mt-1">
            Suivez vos projets de transformation agricole
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowAssistant(true)}
          >
            Ekumen Assistant
          </Button>
          <Button onClick={() => navigate('/transformations/new')}>
            Nouvelle transformation
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <AnalyticsCard
          title="Transformations en cours"
          value={transformationsByStatus.ongoing.length.toString()}
          description="Projets actifs"
          icon={TrendingUp}
        />
        <AnalyticsCard
          title="Nouvelles transformations"
          value={transformationsByStatus.new.length.toString()}
          description="À démarrer"
          icon={Sprout}
        />
        <AnalyticsCard
          title="En revue"
          value={transformationsByStatus['under-review'].length.toString()}
          description="En attente de validation"
          icon={LineChart}
        />
        <AnalyticsCard
          title="Autres projets"
          value={transformationsByStatus.other.length.toString()}
          description="Non stratégiques"
          icon={Target}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue={selectedTab} className="w-full" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="ongoing">En cours</TabsTrigger>
          <TabsTrigger value="new">Nouvelles</TabsTrigger>
          <TabsTrigger value="under-review">En revue</TabsTrigger>
          <TabsTrigger value="under-consideration">À l'étude</TabsTrigger>
          <TabsTrigger value="other">Autres projets</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="space-y-4 mt-6">
          {transformationsByStatus.ongoing.map(transformation => (
            <TransformationCard key={transformation.id} transformation={transformation} />
          ))}
        </TabsContent>

        <TabsContent value="new" className="space-y-4 mt-6">
          {transformationsByStatus.new.map(transformation => (
            <TransformationCard key={transformation.id} transformation={transformation} />
          ))}
        </TabsContent>

        <TabsContent value="under-review" className="space-y-4 mt-6">
          {transformationsByStatus['under-review'].map(transformation => (
            <TransformationCard key={transformation.id} transformation={transformation} />
          ))}
        </TabsContent>

        <TabsContent value="under-consideration" className="space-y-4 mt-6">
          {transformationsByStatus['under-consideration'].map(transformation => (
            <TransformationCard key={transformation.id} transformation={transformation} />
          ))}
        </TabsContent>

        <TabsContent value="other" className="space-y-4 mt-6">
          {transformationsByStatus.other.map(transformation => (
            <TransformationCard key={transformation.id} transformation={transformation} />
          ))}
        </TabsContent>
      </Tabs>

      {showAssistant && (
        <EkumenAssist onClose={() => setShowAssistant(false)} />
      )}
    </div>
  );
}
