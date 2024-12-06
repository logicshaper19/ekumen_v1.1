import React from 'react';
import { UserPlus, BarChart, ClipboardCheck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Créez votre compte',
      description: 'Inscrivez-vous en quelques minutes pour accéder à votre espace personnel.',
    },
    {
      icon: BarChart,
      title: 'Visualisez vos déclarations',
      description: 'Consultez instantanément l\'état d\'avancement de vos différentes déclarations.',
    },
    {
      icon: ClipboardCheck,
      title: 'Complétez simplement',
      description: 'Fournissez une information une seule fois, nous la réutilisons partout où elle est nécessaire.',
    },
  ];

  return (
    <div id="how-it-works" className="py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-base font-semibold tracking-wide uppercase">Comment ça marche ?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Simple, Rapide et Efficace
          </p>
          <p className="text-lg text-gray-600">
            La plupart des documents demandent les mêmes informations. Avec Ekumen, fournissez-les une seule fois et nous remplissons automatiquement toutes vos déclarations obligatoires.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-100 -translate-y-1/2" />
          <div className="relative grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative bg-white p-6 rounded-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-black/5">
                    <step.icon className="h-8 w-8 text-black" />
                  </div>
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}