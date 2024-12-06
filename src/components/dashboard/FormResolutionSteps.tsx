import React from 'react';
import { CalendarClock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

interface FormResolutionStepsProps {
  steps: Step[];
}

export function FormResolutionSteps({ steps }: FormResolutionStepsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-black" />;
      case 'in-progress':
        return <ArrowRight className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Plan de Résolution</h3>
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">{getStatusIcon(step.status)}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  {step.deadline && (
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <CalendarClock className="h-4 w-4 mr-1" />
                      <span>Échéance: {step.deadline}</span>
                    </div>
                  )}
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                  step.priority
                )}`}
              >
                {step.priority === 'high'
                  ? 'Urgent'
                  : step.priority === 'medium'
                  ? 'Important'
                  : 'Normal'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}