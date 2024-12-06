import React from 'react';
import { SignupStep } from '../../types/farmer';
import { User, Building2, Wheat, Map } from 'lucide-react';

interface ProgressBarProps {
  currentStep: SignupStep;
}

const steps = [
  {
    id: 'personal',
    name: 'Informations Personnelles',
    icon: User,
  },
  {
    id: 'business',
    name: 'Informations de l\'Entreprise',
    icon: Building2,
  },
  {
    id: 'farm',
    name: 'Détails de l\'Exploitation',
    icon: Wheat,
  },
  {
    id: 'parcels',
    name: 'Identification des Parcelles',
    icon: Map,
  },
];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex justify-between">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= currentStepIndex;
        
        return (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <div className="flex-1 mx-4 mt-4">
                <div className={`h-1 rounded ${isActive ? 'bg-black' : 'bg-gray-200'}`} />
              </div>
            )}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${isActive ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`mt-2 text-sm ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.name}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}