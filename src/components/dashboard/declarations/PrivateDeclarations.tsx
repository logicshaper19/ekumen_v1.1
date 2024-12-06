import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrivateDeclaration {
  id: number;
  title: string;
  buyer: string;
  description: string;
  progress: number;
  status: string;
  dueDate: string;
}

const privateDeclarations: PrivateDeclaration[] = [
  {
    id: 1,
    title: "Certification Qualité",
    buyer: "Carrefour",
    description: "Déclaration des pratiques agricoles pour la certification qualité Carrefour",
    progress: 0,
    status: "À commencer",
    dueDate: "31 Décembre 2024"
  },
  {
    id: 2,
    title: "Certification Agriculture Durable",
    buyer: "Groupama",
    description: "Documentation des pratiques durables pour l'assurance agricole",
    progress: 0,
    status: "À commencer",
    dueDate: "31 Décembre 2024"
  },
  {
    id: 3,
    title: "Label Rouge",
    buyer: "Label Rouge",
    description: "Certification pour le Label Rouge - qualité supérieure",
    progress: 0,
    status: "À commencer",
    dueDate: "31 Décembre 2024"
  },
  {
    id: 4,
    title: "Certification Bio",
    buyer: "Biocoop",
    description: "Documentation pour la certification agriculture biologique",
    progress: 0,
    status: "À commencer",
    dueDate: "31 Décembre 2024"
  }
];

export function PrivateDeclarations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {privateDeclarations.map((declaration) => (
        <Link
          key={declaration.id}
          to={`/declarations/private/${declaration.id}`}
          className="block"
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <div>
                    <CardTitle className="text-lg">
                      {declaration.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {declaration.buyer}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {declaration.description}
              </p>
              <div className="space-y-2">
                <Progress value={declaration.progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{declaration.status}</span>
                  <span className="text-gray-900 font-medium">
                    {declaration.progress}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Échéance: {declaration.dueDate}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
