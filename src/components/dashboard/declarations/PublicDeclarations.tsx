import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Declaration {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  actionRequired?: boolean;
}

interface PublicDeclarationsProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const declarations: Declaration[] = [
  {
    id: 1,
    title: "Registre parcellaire graphique (RPG)",
    description: "Déclaration des parcelles et leur utilisation pour l'année 2024",
    progress: 0,
    status: "À commencer",
    actionRequired: true
  },
  {
    id: 2,
    title: "Déclaration surface agricole",
    description: "Déclaration des surfaces agricoles utilisées et leurs spécifications",
    progress: 0,
    status: "À commencer",
    actionRequired: true
  },
  {
    id: 3,
    title: "Déclaration effectif animaux",
    description: "Déclaration du nombre d'animaux et leurs catégories",
    progress: 0,
    status: "À commencer",
    actionRequired: true
  },
  {
    id: 4,
    title: "Registre d'élevage",
    description: "Documentation des mouvements et de la santé des animaux",
    progress: 0,
    status: "À commencer",
    actionRequired: true
  }
];

export function PublicDeclarations({ selectedCategory, onSelectCategory }: PublicDeclarationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {declarations.map((declaration) => (
        <Link
          key={declaration.id}
          to={`/declarations/${declaration.id}`}
          className="block"
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">
                    {declaration.title}
                  </CardTitle>
                  {declaration.actionRequired && (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  )}
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
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
