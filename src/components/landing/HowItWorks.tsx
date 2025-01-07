import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, LineChart, MessageSquare } from 'lucide-react';

const steps = [
  {
    name: 'Analyse IA',
    description:
      'Notre intelligence artificielle analyse vos données agricoles et environnementales.',
    icon: Sparkles,
  },
  {
    name: 'Visualisation',
    description:
      'Accédez à des visualisations claires de vos performances et opportunités.',
    icon: LineChart,
  },
  {
    name: 'Recommandations',
    description:
      'Recevez des recommandations personnalisées pour optimiser votre exploitation.',
    icon: MessageSquare,
  },
];

export function HowItWorks() {
  return (
    <div className="bg-[#004D40]/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#004D40]">
            Comment ça marche
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#004D40] sm:text-4xl">
            Une approche simple et efficace
          </p>
          <p className="mt-6 text-lg leading-8 text-[#004D40]/80">
            Découvrez comment notre plateforme transforme vos données en insights actionnables
            pour améliorer votre exploitation agricole.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.name} className="flex flex-col items-center text-center">
                <dt className="flex flex-col items-center gap-y-4">
                  <div className="rounded-lg bg-[#004D40] p-3 text-[#FAF7F0]">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="text-base font-semibold leading-7 text-[#004D40]">
                    {step.name}
                  </div>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-[#004D40]/70">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#004D40] text-[#FAF7F0] hover:bg-[#004D40]/90"
            >
              <Link to="/signup" className="flex items-center gap-2">
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
