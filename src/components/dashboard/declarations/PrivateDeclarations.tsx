import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Lock, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NewPrivateDeclarationDialog } from './NewPrivateDeclarationDialog';

interface PrivateDeclaration {
  id: string;
  title: string;
  buyer: string;
  description: string;
}

const privateDeclarations: PrivateDeclaration[] = [
  {
    id: 'certification-qualite',
    title: "Certification Qualité",
    buyer: "Carrefour",
    description: "Déclaration des pratiques agricoles pour la certification qualité Carrefour"
  },
  {
    id: 'certification-agriculture-durable',
    title: "Certification Agriculture Durable",
    buyer: "Groupama",
    description: "Documentation des pratiques durables pour l'assurance agricole"
  },
  {
    id: 'label-rouge',
    title: "Label Rouge",
    buyer: "Label Rouge",
    description: "Certification pour le Label Rouge - qualité supérieure"
  },
  {
    id: 'certification-bio',
    title: "Certification Bio",
    buyer: "Biocoop",
    description: "Documentation pour la certification agriculture biologique"
  }
];

export function PrivateDeclarations() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeclarationClick = (id: string) => {
    navigate(`/declarations/${id}`);
  };

  const handleNewDeclaration = (declaration: {
    title: string;
    buyer: string;
    description: string;
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
            className="cursor-pointer hover:bg-accent/50 transition-colors"
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
              <p className="text-sm text-gray-600">
                {declaration.description}
              </p>
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
