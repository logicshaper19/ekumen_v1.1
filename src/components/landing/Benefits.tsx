import React from 'react';
import { Brain, TrendingUp, Shield, Users } from 'lucide-react';

const benefits = [
  {
    name: 'Intelligence Artificielle Avancée',
    description:
      'Notre IA analyse vos données agricoles pour fournir des recommandations personnalisées et précises.',
    icon: Brain,
  },
  {
    name: 'Optimisation des Performances',
    description:
      'Améliorez votre rendement et votre rentabilité grâce à des insights basés sur les données.',
    icon: TrendingUp,
  },
  {
    name: 'Gestion des Risques',
    description:
      'Anticipez et gérez les risques climatiques, économiques et environnementaux.',
    icon: Shield,
  },
  {
    name: 'Support Communautaire',
    description: "Rejoignez une communauté d'agriculteurs et partagez vos expériences.",
    icon: Users,
  },
];

export function Benefits() {
  return (
    <div className="bg-[#FAF7F0] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#004D40]">
            Pourquoi Choisir Ekumen
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#004D40] sm:text-4xl">
            Des solutions innovantes pour l'agriculture moderne
          </p>
          <p className="mt-6 text-lg leading-8 text-[#004D40]/80">
            Découvrez comment notre plateforme peut transformer votre approche de l'agriculture
            et améliorer vos résultats.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-[#004D40]">
                  <benefit.icon className="h-5 w-5 flex-none text-[#004D40]" aria-hidden="true" />
                  {benefit.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-[#004D40]/70">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
