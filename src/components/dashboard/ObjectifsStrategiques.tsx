import React from 'react';
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ObjectifProps {
  label: string;
  current: number;
  target: number;
  status: 'warning' | 'success';
}

const ObjectifItem = ({ label, current, target, status }: ObjectifProps) => {
  const percentage = (current / target) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2">
          {status === 'warning' ? (
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          )}
          <span className="text-sm">
            {current} / {target}%
          </span>
        </div>
      </div>
      <Progress 
        value={percentage} 
        className={cn(
          "h-2",
          status === 'warning' ? "bg-orange-100" : "bg-green-100",
          "[&>div]:transition-all"
        )}
        indicatorClassName={
          status === 'warning' ? "bg-orange-500" : "bg-green-500"
        }
      />
    </div>
  );
};

export function ObjectifsStrategiques() {
  const objectifs = [
    {
      label: "Consommation d'eau",
      current: 8,
      target: 14,
      status: 'warning' as const,
    },
    {
      label: "Surface Bio",
      current: 20,
      target: 25,
      status: 'success' as const,
    },
    {
      label: "Émissions CO2",
      current: 15,
      target: 30,
      status: 'warning' as const,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Objectifs Stratégiques</h2>
      <div className="space-y-4">
        {objectifs.map((objectif) => (
          <ObjectifItem key={objectif.label} {...objectif} />
        ))}
      </div>
      <a 
        href="#" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        Voir les objectifs
        <ChevronRight className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
}
