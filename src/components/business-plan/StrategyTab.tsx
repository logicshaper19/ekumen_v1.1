import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Target, Leaf, Lightbulb, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { Progress } from '@/components/ui/progress';

interface Objective {
  id: string;
  title: string;
  description: string;
  startYear: number;
  duration: number;
  progress: number;
  status: 'completed' | 'in-progress' | 'at-risk';
  timeline: {
    year: number;
    target: number;
    actual?: number;
  }[];
}

const mockObjectives: Objective[] = [
  {
    id: '1',
    title: 'Conversion Bio',
    description: 'Transition vers une agriculture 100% biologique',
    startYear: 2024,
    duration: 3,
    progress: 40,
    status: 'in-progress',
    timeline: [
      { year: 2024, target: 30, actual: 40 },
      { year: 2025, target: 60 },
      { year: 2026, target: 100 }
    ]
  },
  {
    id: '2',
    title: 'Réduction Intrants',
    description: 'Réduire l\'utilisation d\'intrants chimiques de 50%',
    startYear: 2024,
    duration: 2,
    progress: 15,
    status: 'at-risk',
    timeline: [
      { year: 2024, target: 25, actual: 15 },
      { year: 2025, target: 50 }
    ]
  },
  {
    id: '3',
    title: 'Diversification Cultures',
    description: 'Introduire 3 nouvelles cultures à haute valeur ajoutée',
    startYear: 2024,
    duration: 5,
    progress: 100,
    status: 'completed',
    timeline: [
      { year: 2024, target: 1, actual: 1 },
      { year: 2025, target: 2 },
      { year: 2026, target: 2 },
      { year: 2027, target: 3 },
      { year: 2028, target: 3 }
    ]
  }
];

function getStatusIcon(status: Objective['status']) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-blue-500" />;
    case 'at-risk':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
  }
}

function getStatusColor(status: Objective['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'at-risk':
      return 'bg-red-100 text-red-800';
  }
}

export function StrategyTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Définissez et suivez vos objectifs stratégiques pour transformer votre exploitation et améliorer sa performance globale.
      </p>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Objectifs Atteints"
          value="75%"
          description="8 sur 12 objectifs"
          change="+25%"
          trend="up"
          icon={Target}
        />
        <AnalyticsCard
          title="Impact Environnemental"
          value="-30%"
          description="Réduction des intrants"
          change="-10%"
          trend="down"
          icon={Leaf}
        />
        <AnalyticsCard
          title="Innovations"
          value="5"
          description="Nouvelles technologies"
          change="+2"
          trend="up"
          icon={Lightbulb}
        />
      </div>

      {/* Add Objective Button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => navigate('/business-plan/add-objective')}
          className="bg-teal-700 text-white hover:bg-teal-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un objectif
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mes Objectifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockObjectives.map((objective) => (
              <div key={objective.id} className="bg-white p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(objective.status)}
                      <h3 className="text-lg font-medium">{objective.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(objective.status)}`}>
                        {objective.status === 'completed' ? 'Terminé' : 
                         objective.status === 'in-progress' ? 'En cours' : 'En retard'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{objective.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{objective.progress}%</div>
                    <div className="text-xs text-gray-500">Progression</div>
                  </div>
                </div>
                
                <Progress value={objective.progress} className="mb-4" />
                
                <div className="grid grid-cols-5 gap-4">
                  {[2024, 2025, 2026, 2027, 2028].map(year => {
                    const yearData = objective.timeline.find(t => t.year === year);
                    if (!yearData) return (
                      <div key={year} className="text-center text-gray-300">
                        <div className="text-sm">{year}</div>
                        <div className="text-xs">-</div>
                      </div>
                    );
                    
                    return (
                      <div key={year} className="text-center">
                        <div className="text-sm font-medium">{year}</div>
                        <div className="text-xs">
                          {yearData.actual !== undefined ? (
                            <span className={yearData.actual >= yearData.target ? 'text-green-600' : 'text-red-600'}>
                              {yearData.actual}%
                            </span>
                          ) : (
                            <span className="text-gray-600">{yearData.target}%</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
