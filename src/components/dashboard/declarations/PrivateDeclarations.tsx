import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Lock, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NewPrivateDeclarationDialog } from './NewPrivateDeclarationDialog';

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
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeclarationClick = (declarationId: number) => {
    navigate(`/declarations/${declarationId}`);
  };

  const handleNewDeclaration = (declaration: {
    title: string;
    buyer: string;
    description: string;
    dueDate: string;
    documents: File[];
  }) => {
    // TODO: Implement API call to create new declaration
    console.log('New declaration:', declaration);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Mes Déclarations Privées</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une déclaration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {privateDeclarations.map((declaration) => (
          <Card 
            key={declaration.id}
            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => handleDeclarationClick(declaration.id)}
          >
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
        ))}
      </div>

      <NewPrivateDeclarationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleNewDeclaration}
      />
    </>
  );
}
