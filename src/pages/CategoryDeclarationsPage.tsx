import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ArrowLeft } from 'lucide-react';

// Import the categories data from PublicDeclarations
import { categories } from '@/components/dashboard/declarations/PublicDeclarations';

export function CategoryDeclarationsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Catégorie non trouvée</h2>
          <Link 
            to="/dashboard" 
            className="text-primary hover:underline"
          >
            Retour aux déclarations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/dashboard" className="hover:text-primary">
          Déclarations
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{category.title}</span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{category.title}</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {category.declarations.map((declaration) => (
            <Card
              key={declaration.id}
              className="h-full hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/declarations/${declaration.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {declaration.title}
                  </CardTitle>
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
          ))}
        </div>
      </div>
    </div>
  );
}
