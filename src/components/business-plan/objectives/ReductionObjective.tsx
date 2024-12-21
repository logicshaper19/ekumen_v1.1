import { ReductionObjective } from './types';
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, Pencil, Trash2, TrendingDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ReductionObjectiveProps {
  objective: ReductionObjective;
  onEdit: (objective: ReductionObjective) => void;
  onDelete: (id: string) => void;
}

export function ReductionObjectiveCard({ objective, onEdit, onDelete }: ReductionObjectiveProps) {
  const currentYear = new Date().getFullYear();
  const currentValue = objective.timeline.find(t => t.year === currentYear)?.actual;
  const reduction = currentValue !== undefined 
    ? ((objective.baselineValue - currentValue) / objective.baselineValue) * 100
    : 0;

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
          {/* Left side - Reduction Indicator */}
          <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
            <TrendingDown className={`h-8 w-8 ${
              reduction >= objective.targetReduction ? 'text-green-500' : 'text-red-500'
            }`} />
            <div className="text-2xl font-bold">
              {reduction ? `-${Math.round(reduction)}%` : '0%'}
            </div>
            <div className="text-sm text-gray-500">
              Objectif: -{objective.targetReduction}%
            </div>
          </div>

          {/* Middle - Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon()}
                <Badge variant={getStatusBadgeVariant(objective.status)}>
                  {objective.status}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(objective)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(objective.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {objective.objectives.map((obj, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={cn(
                    'border-2',
                    obj.color === 'green' && 'border-green-500 text-green-700',
                    obj.color === 'blue' && 'border-blue-500 text-blue-700',
                    obj.color === 'yellow' && 'border-yellow-500 text-yellow-700',
                    obj.color === 'purple' && 'border-purple-500 text-purple-700'
                  )}
                >
                  {obj.label}
                </Badge>
              ))}
            </div>
            <h3 className="text-lg font-medium mt-4">{objective.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{objective.description}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress 
                value={(reduction / objective.targetReduction) * 100} 
                className="h-2"
                style={{
                  backgroundColor: '#F5F5F0',
                }}
              />
            </div>

            {/* Baseline and Current Values */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Valeur initiale</div>
                <div className="text-lg font-medium">
                  {objective.baselineValue} {objective.unit}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Valeur actuelle</div>
                <div className="text-lg font-medium">
                  {currentValue || '-'} {objective.unit}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-5 gap-4">
              {[2024, 2025, 2026, 2027, 2028].map(year => {
                const yearData = objective.timeline.find(t => t.year === year);
                const reductionTarget = yearData?.target || 0;
                const actualReduction = yearData?.actual !== undefined
                  ? ((objective.baselineValue - yearData.actual) / objective.baselineValue) * 100
                  : undefined;

                return (
                  <div key={year} className="text-center">
                    <div className={`text-sm font-medium ${!yearData?.target ? 'text-gray-300' : ''}`}>
                      {year}
                    </div>
                    <div className="text-sm">
                      {actualReduction !== undefined ? (
                        <span className={actualReduction >= reductionTarget ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          -{Math.round(actualReduction)}%
                        </span>
                      ) : reductionTarget ? (
                        <span className="text-gray-600">-{reductionTarget}%</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
