import React from 'react';
import { TrendingUp, Leaf, Factory, Sprout } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const transformationProjects = [
  {
    id: 1,
    title: "Conversion Bio",
    description: "Transition vers l'agriculture biologique certifiée",
    timeline: "2-3 ans",
    impact: "Augmentation de la valeur marchande de 30-50%",
    requirements: [
      "Formation en agriculture biologique",
      "Période de conversion des terres",
      "Certification AB"
    ],
    icon: Leaf
  },
  {
    id: 2,
    title: "Transformation à la Ferme",
    description: "Création d'un atelier de transformation des produits",
    timeline: "1-2 ans",
    impact: "Valeur ajoutée de 40-60% sur les produits transformés",
    requirements: [
      "Équipement de transformation",
      "Formation HACCP",
      "Autorisation sanitaire"
    ],
    icon: Factory
  },
  {
    id: 3,
    title: "Diversification Culturale",
    description: "Introduction de nouvelles cultures à haute valeur ajoutée",
    timeline: "1 an",
    impact: "Augmentation du revenu de 20-35%",
    requirements: [
      "Étude de marché",
      "Acquisition de matériel spécifique",
      "Formation technique"
    ],
    icon: Sprout
  }
];

export function Transformation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Projets de Transformation</h1>
        <p className="mt-2 text-gray-600">
          Découvrez les opportunités de transformation pour votre exploitation
        </p>
      </div>

      <div className="grid gap-6">
        {transformationProjects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-black/5">
                  <project.icon className="h-6 w-6 text-black" />
                </div>
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-black" />
                    <span className="font-medium">Impact Financier</span>
                  </div>
                  <p className="text-sm text-gray-600">{project.impact}</p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Durée du Projet: {project.timeline}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Prérequis:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {project.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors">
                  En Savoir Plus
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}