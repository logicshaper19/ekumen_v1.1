import React from 'react';
import { Card } from '@/components/ui/card';
import { InfoIcon, Clock } from 'lucide-react';

interface Regulation {
  title: string;
  description: string;
  effectiveDate: string;
  source?: string;
  changes?: string[];
}

interface RegulationInfo {
  currentRegulation: Regulation;
  upcomingRegulation?: Regulation;
}

interface ReglementationProps {
  regulationInfo: RegulationInfo;
}

export function Reglementation({ regulationInfo }: ReglementationProps) {
  const { currentRegulation, upcomingRegulation } = regulationInfo;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-900">
        <InfoIcon className="h-5 w-5 text-orange-600" />
        <h3 className="font-medium">Réglementation</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Regulation */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Réglementation Actuelle</h4>
          <div className="space-y-4">
            <h5 className="text-lg font-medium">{currentRegulation.title}</h5>
            <p className="text-gray-600">{currentRegulation.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>En vigueur depuis le {currentRegulation.effectiveDate}</span>
            </div>
            {currentRegulation.source && (
              <p className="text-sm text-gray-500">
                Source: {currentRegulation.source}
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Regulation */}
        {upcomingRegulation && (
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Évolution de la Réglementation</h4>
              <span className="text-sm text-orange-600">
                (À partir du {upcomingRegulation.effectiveDate})
              </span>
            </div>
            <div className="space-y-4">
              <h5 className="text-lg font-medium">{upcomingRegulation.title}</h5>
              <p className="text-gray-600">{upcomingRegulation.description}</p>
              {upcomingRegulation.changes && upcomingRegulation.changes.length > 0 && (
                <div>
                  <h6 className="font-medium mb-2">Principaux changements:</h6>
                  <ul className="list-disc pl-5 space-y-2">
                    {upcomingRegulation.changes.map((change, index) => (
                      <li key={index} className="text-gray-600">{change}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
