import React from 'react';
import { Clock, FileCheck, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Benefits() {
  const benefits = [
    {
      title: 'Gagnez du Temps',
      description: 'Remplissez automatiquement les formulaires complexes avec les données de votre exploitation.',
      icon: Clock,
    },
    {
      title: 'Restez Conforme',
      description: 'Ne manquez plus aucune échéance grâce aux mises à jour réglementaires intégrées.',
      icon: FileCheck,
    },
    {
      title: 'Maximisez vos Aides',
      description: 'Assurez-vous d\'obtenir toutes les aides auxquelles vous avez droit.',
      icon: Calculator,
    },
  ];

  return (
    <div id="benefits" className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold tracking-wide uppercase">Avantages</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            L'agriculture intelligente commence par une administration intelligente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}