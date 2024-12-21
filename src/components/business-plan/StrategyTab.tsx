import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Target, Leaf, Lightbulb } from 'lucide-react';
import { EditObjectiveDialog } from './EditObjectiveDialog';
import { PercentageObjectiveCard } from './objectives/PercentageObjective';
import { ReductionObjectiveCard } from './objectives/ReductionObjective';
import { QuantityObjectiveCard } from './objectives/QuantityObjective';
import { Objective } from './objectives/types';
import { AnalyticsCard } from '@/components/ui/analytics-card';

interface Objective {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'delayed';
  type: 'percentage' | 'reduction' | 'quantity';
  objectives: {
    label: string;
    color: 'green' | 'blue' | 'yellow' | 'purple';
  }[];
  timeline: Array<{
    year: number;
    target: number;
    actual?: number;
  }>;
  baselineValue?: number;
  currentCount?: number;
}

const mockObjectives: Objective[] = [
  {
    id: '1',
    title: 'Conversion Bio',
    description: 'Transition vers une agriculture 100% biologique',
    status: 'in-progress',
    type: 'percentage',
    objectives: [
      { label: 'Environnement', color: 'green' },
      { label: 'Rentabilité', color: 'purple' }
    ],
    timeline: [
      { year: 2024, target: 40, actual: 40 },
      { year: 2025, target: 60 },
      { year: 2026, target: 100 },
      { year: 2027, target: 0 },
      { year: 2028, target: 0 },
    ],
  },
  {
    id: '2',
    title: 'Réduction Intrants',
    description: 'Réduire l\'utilisation d\'intrants chimiques de 50%',
    status: 'delayed',
    type: 'reduction',
    objectives: [
      { label: 'Environnement', color: 'green' },
      { label: 'Efficacité', color: 'blue' }
    ],
    baselineValue: 100,
    timeline: [
      { year: 2024, target: 30, actual: 15 },
      { year: 2025, target: 50 },
      { year: 2026, target: 0 },
      { year: 2027, target: 0 },
      { year: 2028, target: 0 },
    ],
  },
  {
    id: '3',
    title: 'Diversification Cultures',
    description: 'Introduire 3 nouvelles cultures à haute valeur ajoutée',
    status: 'completed',
    type: 'quantity',
    objectives: [
      { label: 'Résilience', color: 'yellow' },
      { label: 'Rentabilité', color: 'purple' }
    ],
    currentCount: 3,
    timeline: [
      { year: 2024, target: 1, actual: 1 },
      { year: 2025, target: 2 },
      { year: 2026, target: 2 },
      { year: 2027, target: 3 },
      { year: 2028, target: 3 },
    ],
  },
];

export function StrategyTab() {
  const [objectives, setObjectives] = useState(mockObjectives);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<Objective | undefined>();

  // Calculate overview statistics
  const totalObjectives = objectives.length;
  const completedObjectives = objectives.filter(obj => obj.status === 'completed').length;
  const completionPercentage = totalObjectives ? Math.round((completedObjectives / totalObjectives) * 100) : 0;
  const previousCompletionPercentage = 50; // This would come from historical data
  const completionDelta = completionPercentage - previousCompletionPercentage;

  const environmentalImpact = objectives
    .filter(obj => obj.type === 'reduction')
    .reduce((acc, obj) => {
      const currentYear = new Date().getFullYear();
      const currentValue = obj.timeline.find(t => t.year === currentYear)?.actual ?? obj.baselineValue;
      if (currentValue !== undefined && obj.baselineValue) {
        return acc + ((obj.baselineValue - currentValue) / obj.baselineValue) * 100;
      }
      return acc;
    }, 0);
  const previousEnvironmentalImpact = -20; // This would come from historical data
  const environmentalDelta = environmentalImpact - previousEnvironmentalImpact;

  const innovations = objectives
    .filter(obj => obj.type === 'quantity')
    .reduce((acc, obj) => acc + (obj.currentCount || 0), 0);
  const previousInnovations = 3; // This would come from historical data
  const innovationsDelta = innovations - previousInnovations;

  const handleAddObjective = () => {
    setSelectedObjective(undefined);
    setIsEditDialogOpen(true);
  };

  const handleEditObjective = (objective: Objective) => {
    setSelectedObjective(objective);
    setIsEditDialogOpen(true);
  };

  const handleDeleteObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  const handleSaveObjective = (objective: Objective) => {
    if (selectedObjective) {
      setObjectives(objectives.map(obj => 
        obj.id === selectedObjective.id ? objective : obj
      ));
    } else {
      setObjectives([...objectives, objective]);
    }
    setIsEditDialogOpen(false);
  };

  const renderObjective = (objective: Objective) => {
    switch (objective.type) {
      case 'percentage':
        return (
          <PercentageObjectiveCard
            objective={objective}
            onEdit={handleEditObjective}
            onDelete={handleDeleteObjective}
          />
        );
      case 'reduction':
        return (
          <ReductionObjectiveCard
            objective={objective}
            onEdit={handleEditObjective}
            onDelete={handleDeleteObjective}
          />
        );
      case 'quantity':
        return (
          <QuantityObjectiveCard
            objective={objective}
            onEdit={handleEditObjective}
            onDelete={handleDeleteObjective}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Définissez et suivez vos objectifs stratégiques pour transformer votre exploitation et améliorer sa performance globale.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Objectifs Atteints"
          value={`${completionPercentage}%`}
          description={`${completedObjectives} sur ${totalObjectives} objectifs`}
          change={`${completionDelta >= 0 ? '+' : ''}${completionDelta}%`}
          trend={completionDelta >= 0 ? 'up' : 'down'}
          icon={Target}
        />

        <AnalyticsCard
          title="Impact Environnemental"
          value={`${Math.round(environmentalImpact) || 0}%`}
          description="Réduction des intrants"
          change={`${environmentalDelta >= 0 ? '+' : ''}${Math.round(environmentalDelta) || 0}%`}
          trend={environmentalDelta >= 0 ? 'up' : 'down'}
          icon={Leaf}
        />

        <AnalyticsCard
          title="Innovations"
          value={innovations.toString()}
          description="Nouvelles technologies"
          change={`${innovationsDelta >= 0 ? '+' : ''}${innovationsDelta}`}
          trend={innovationsDelta >= 0 ? 'up' : 'down'}
          icon={Lightbulb}
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mes Objectifs</h2>
        <Button onClick={handleAddObjective}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un objectif
        </Button>
      </div>

      <div className="space-y-4">
        {objectives.map(objective => (
          <div key={objective.id}>
            {renderObjective(objective)}
          </div>
        ))}
      </div>

      <EditObjectiveDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        objective={selectedObjective}
        onSave={handleSaveObjective}
      />
    </div>
  );
}
