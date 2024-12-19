import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Shield, Sun } from "lucide-react";

export function RisksOpportunities() {
  const sections = [
    {
      title: "Risques Climatiques",
      items: [
        "Sécheresse prolongée",
        "Événements extrêmes",
        "Variations de température"
      ],
      icon: Sun,
      type: "risk"
    },
    {
      title: "Opportunités de Marché",
      items: [
        "Nouveaux débouchés",
        "Produits à forte valeur ajoutée",
        "Circuits courts"
      ],
      icon: TrendingUp,
      type: "opportunity"
    },
    {
      title: "Solutions de Protection",
      items: [
        "Assurances adaptées",
        "Diversification",
        "Innovation technique"
      ],
      icon: Shield,
      type: "solution"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Risques & Opportunités</h1>
        <p className="text-gray-600 mb-4">
          Identifiez et gérez les risques tout en saisissant les opportunités de développement pour votre exploitation.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-[#00A9A3] bg-opacity-10">
              <AlertTriangle className="h-6 w-6 text-[#00A9A3]" />
            </div>
            <CardTitle>Analyse des Risques et Opportunités</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-[#00A9A3] bg-opacity-10">
                      <Icon className="h-6 w-6 text-[#00A9A3]" />
                    </div>
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {section.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic Personnalisé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Bénéficiez d'une analyse approfondie des risques spécifiques à votre exploitation 
              et identifiez les opportunités de développement adaptées à votre contexte.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan d'Action</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Développez une stratégie claire pour gérer les risques identifiés et saisir 
              les opportunités de croissance, avec un accompagnement personnalisé.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
