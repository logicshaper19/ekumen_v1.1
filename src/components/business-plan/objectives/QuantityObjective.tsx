import { QuantityObjective } from './types';
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, Pencil, Trash2, Target } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface QuantityObjectiveProps {
  objective: QuantityObjective;
  onEdit: (objective: QuantityObjective) => void;
  onDelete: (id: string) => void;
}

export function QuantityObjectiveCard({ objective, onEdit, onDelete }: QuantityObjectiveProps) {
  const currentYear = new Date().getFullYear();
  const currentCount = objective.currentCount;
  const progressPercentage = (currentCount / objective.targetCount) * 100;

  const getStatusIcon = () => {
    switch (objective.status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'delayed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'delayed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Left side - Count Display */}
          <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg flex flex-col items-center justify-center relative">
            <Target className="h-6 w-6 text-gray-400 absolute top-2" />
            <div className="text-3xl font-bold mt-4">
              {currentCount}/{objective.targetCount}
            </div>
          </div>

          {/* Middle - Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon()}
              <h3 className="text-lg font-medium">{objective.title}</h3>
              <Badge variant={getStatusBadgeVariant(objective.status)}>
                {objective.status === 'completed' ? 'Terminé' :
                 objective.status === 'delayed' ? 'En retard' : 'En cours'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">{objective.description}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress 
                value={progressPercentage} 
                className="h-2"
                style={{
                  backgroundColor: '#F5F5F0',
                }}
              />
            </div>

            {/* Items List if available */}
            {objective.items && objective.items.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-sm font-medium mb-2">Éléments ajoutés:</div>
                <div className="flex flex-wrap gap-2">
                  {objective.items.map((item, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="bg-white"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="grid grid-cols-5 gap-4">
              {[2024, 2025, 2026, 2027, 2028].map(year => {
                const yearData = objective.timeline.find(t => t.year === year);
                return (
                  <div key={year} className="text-center">
                    <div className={`text-sm font-medium ${!yearData?.target ? 'text-gray-300' : ''}`}>
                      {year}
                    </div>
                    <div className="text-sm">
                      {yearData?.actual !== undefined ? (
                        <span className={yearData.actual >= (yearData.target || 0) ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {yearData.actual}
                        </span>
                      ) : yearData?.target ? (
                        <span className="text-gray-600">{yearData.target}</span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(objective)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(objective.id)}
              className="h-8 w-8 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
