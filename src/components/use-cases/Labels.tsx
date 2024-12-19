import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Target, TrendingUp, Users } from "lucide-react";

export function Labels() {
  const certifications = [
    {
      title: "Agriculture Biologique",
      description: "Certification AB reconnue au niveau européen",
      benefits: ["Premium de prix", "Accès à de nouveaux marchés", "Impact environnemental positif"],
      icon: Award
    },
    {
      title: "HVE",
      description: "Haute Valeur Environnementale",
      benefits: ["Reconnaissance officielle", "Valorisation commerciale", "Démarche progressive"],
      icon: Target
    },
    {
      title: "Label Rouge",
      description: "Label national de qualité supérieure",
      benefits: ["Différenciation produit", "Confiance consommateur", "Réseau structuré"],
      icon: TrendingUp
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Labels & Certifications</h1>
        <p className="text-gray-600 mb-4">
          Valorisez votre production et accédez à de nouveaux marchés grâce aux labels et certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-full bg-[#00A9A3] bg-opacity-10">
                    <Icon className="h-6 w-6 text-[#00A9A3]" />
                  </div>
                  <div>
                    <CardTitle>{cert.title}</CardTitle>
                  </div>
                </div>
                <p className="text-gray-600">{cert.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <h4 className="font-semibold mb-2">Avantages :</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {cert.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-[#00A9A3] bg-opacity-10">
              <Users className="h-6 w-6 text-[#00A9A3]" />
            </div>
            <CardTitle>Accompagnement Personnalisé</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Notre équipe vous accompagne dans le choix et l'obtention des certifications les plus adaptées à votre exploitation. 
            Nous vous guidons à chaque étape du processus, de l'évaluation initiale jusqu'à la certification finale.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
