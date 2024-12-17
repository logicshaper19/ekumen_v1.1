import React from 'react';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { Clock, CheckCircle2, AlertTriangle, ListTodo } from 'lucide-react';

interface DeclarationAnalyticsProps {
  progress: number;
  daysLeft?: number;
  totalSteps: number;
  completedSteps: number;
  pendingItems: number;
}

export function DeclarationAnalytics({
  progress,
  daysLeft = 30,
  totalSteps,
  completedSteps,
  pendingItems
}: DeclarationAnalyticsProps) {
  const completionRate = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Déclarations Réglementaires</h2>
        <p className="text-muted-foreground">
          Gérez vos déclarations réglementaires et suivez leur statut. Restez conforme aux exigences légales et anticipez les échéances importantes pour votre exploitation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AnalyticsCard
          title="Progression"
          value={`${progress}%`}
          change={progress > 50 ? '+10%' : undefined}
          trend={progress > 50 ? 'up' : undefined}
          icon={CheckCircle2}
          description="de la déclaration"
        />
        
        <AnalyticsCard
          title="Jours Restants"
          value={`${daysLeft}`}
          change={daysLeft < 15 ? 'Urgent' : undefined}
          trend={daysLeft < 15 ? 'down' : undefined}
          icon={Clock}
          description="avant la date limite"
        />

        <AnalyticsCard
          title="Taux de Complétion"
          value={`${completionRate}%`}
          change={`${completedSteps}/${totalSteps} étapes`}
          trend={completionRate > 50 ? 'up' : 'down'}
          icon={ListTodo}
          description="des étapes requises"
        />

        <AnalyticsCard
          title="Éléments en Attente"
          value={`${pendingItems}`}
          change={pendingItems > 0 ? 'À compléter' : 'Tout est complété'}
          trend={pendingItems > 0 ? 'down' : 'up'}
          icon={AlertTriangle}
          description="documents ou informations"
        />
      </div>
    </div>
  );
}
