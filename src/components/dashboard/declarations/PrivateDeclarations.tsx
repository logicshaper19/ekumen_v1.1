import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Award, CheckCircle2, Clock } from 'lucide-react';

const privateDeclarations = [
  {
    id: 1,
    title: "Label Rouge",
    organization: "InVivo",
    status: "En cours",
    progress: 65,
    requirements: [
      "Cahier des charges Label Rouge",
      "Audit de certification",
      "Contrôles qualité"
    ],
    deadline: "30 Juin 2024"
  },
  {
    id: 2,
    title: "Certification HVE",
    organization: "Ministère de l'Agriculture",
    status: "Validé",
    progress: 100,
    requirements: [
      "Biodiversité",
      "Stratégie phytosanitaire",
      "Gestion de la fertilisation"
    ],
    deadline: "Complété"
  },
  {
    id: 3,
    title: "Filière Carrefour",
    organization: "Carrefour Quality Line",
    status: "À commencer",
    progress: 0,
    requirements: [
      "Critères qualité Carrefour",
      "Traçabilité",
      "Bien-être animal"
    ],
    deadline: "31 Décembre 2024"
  }
];

export function PrivateDeclarations() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {privateDeclarations.map(declaration => (
          <Card key={declaration.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-black/5">
                    <Award className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <CardTitle>{declaration.title}</CardTitle>
                    <CardDescription>{declaration.organization}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {declaration.progress === 100 ? (
                    <CheckCircle2 className="h-5 w-5 text-black" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className="text-sm font-medium">
                    {declaration.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progression</span>
                    <span className="text-sm font-medium text-gray-900">{declaration.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        declaration.progress === 100
                          ? 'bg-black'
                          : declaration.progress >= 50
                          ? 'bg-black/80'
                          : 'bg-yellow-500'
                      }`}
                      style={{ width: `${declaration.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Critères requis:</h4>
                  <ul className="space-y-2">
                    {declaration.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-gray-500">
                    Échéance: {declaration.deadline}
                  </span>
                  <button className="text-sm font-medium text-black hover:text-black/80">
                    Voir les détails
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}