import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import the categories data from PublicDeclarations
import { categories } from '@/components/dashboard/declarations/PublicDeclarations';

export function CategoryDeclarationsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.id === categoryId);

  const handleDeclarationClick = (declarationId: string) => {
    navigate(`/declarations/${declarationId}`);
  };

  if (!category) {
    return (
      <div className="p-8">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/reglementations')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux réglementations
        </Button>
        <h2 className="text-xl font-semibold text-red-600">Catégorie non trouvée</h2>
        <p className="mt-2 text-gray-600">La catégorie que vous recherchez n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/reglementations')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux réglementations
      </Button>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{category.title}</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Declarations List */}
        <div className="grid grid-cols-1 gap-4">
          {category.declarations.map((declaration) => (
            <Card 
              key={declaration.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleDeclarationClick(declaration.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">{declaration.title}</h3>
                    <p className="text-sm text-gray-600">{declaration.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
                </div>
                
                <div className="mt-4 space-y-2">
                  <Progress value={declaration.progress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{declaration.status}</span>
                    <span className="text-gray-900 font-medium">{declaration.progress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
