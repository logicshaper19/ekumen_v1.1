import React from 'react';
import { Check } from 'lucide-react';

const benefits = [
  'Gestion simplifiée des déclarations PAC',
  'Suivi en temps réel de vos parcelles',
  'Analyses et rapports détaillés',
  'Support technique dédié',
  'Interface intuitive et moderne',
  'Sécurité des données garantie',
];

export function Benefits() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Les avantages de notre plateforme
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez pourquoi des milliers d'agriculteurs nous font confiance pour la gestion de leur exploitation.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {benefits.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-black" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
