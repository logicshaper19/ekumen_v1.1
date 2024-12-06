import React from 'react';
import { SignupStep } from '../../types/farmer';

interface ProgressBarProps {
  currentStep: SignupStep;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps: { key: SignupStep; label: string }[] = [
    { key: 'personal', label: 'Informations Personnelles' },
    { key: 'business', label: 'Informations Professionnelles' },
    { key: 'farm', label: 'Détails de l\'Exploitation' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  return (
    <div>
      <div className="flex items-center justify-between relative px-12">
        {steps.map((step, index) => {
          const isActive = index <= getCurrentStepIndex();
          const isCompleted = index < getCurrentStepIndex();

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    isActive
                      ? 'bg-black border-black text-white shadow-md'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div
                  className={`mt-3 text-sm font-medium ${
                    isActive ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${
                    index < getCurrentStepIndex() ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}