import React from 'react';
import { FileText, Map, TrendingUp } from 'lucide-react';

const features = [
  {
    name: 'Gestion des Déclarations',
    description: 'Gérez facilement vos déclarations agricoles et suivez leur progression en temps réel.',
    icon: FileText,
  },
  {
    name: 'Suivi des Parcelles',
    description: 'Visualisez et gérez vos parcelles avec notre interface cartographique intuitive.',
    icon: Map,
  },
  {
    name: 'Optimisation de la Performance',
    description: 'Analysez vos données pour optimiser la performance de votre exploitation.',
    icon: TrendingUp,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#004D40]">Comment ça marche</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#004D40] sm:text-4xl">
            Une approche simple et efficace
          </p>
          <p className="mt-6 text-lg leading-8 text-[#004D40]">
            Notre plateforme vous accompagne dans la gestion quotidienne de votre exploitation agricole.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="flex flex-col items-start">
                  <div className="rounded-lg bg-gray-50 p-2 ring-1 ring-gray-900/10">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <dt className="mt-4 text-base font-semibold leading-7 text-[#004D40]">{feature.name}</dt>
                  <dd className="mt-2 leading-7 text-[#004D40]">{feature.description}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
