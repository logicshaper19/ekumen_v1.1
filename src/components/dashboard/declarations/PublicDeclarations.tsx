import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Declaration {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  category: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  declarations: Declaration[];
}

const categories: Category[] = [
  {
    id: 'registration',
    title: 'Formulaires d\'Enregistrement et Administratifs',
    description: 'Documents administratifs et enregistrements obligatoires',
    declarations: [
      {
        id: 'declaration-activite',
        title: 'Déclaration d\'Activité Agricole',
        description: 'Enregistrement officiel de votre activité agricole',
        progress: 0,
        status: 'À commencer',
        category: 'registration'
      },
      {
        id: 'foncier-rural',
        title: 'Foncier Rural',
        description: 'Déclaration des terres agricoles et leur statut',
        progress: 0,
        status: 'À commencer',
        category: 'registration'
      }
    ]
  },
  {
    id: 'subsidy',
    title: 'Aides et Subventions',
    description: 'Demandes de subventions et aides financières',
    declarations: [
      {
        id: 'pac',
        title: 'PAC - Politique Agricole Commune',
        description: 'Demande de paiement unique de la PAC',
        progress: 0,
        status: 'À commencer',
        category: 'subsidy'
      },
      {
        id: 'aides',
        title: 'Demandes d\'Aides et Subventions',
        description: 'Autres demandes de subventions agricoles',
        progress: 0,
        status: 'À commencer',
        category: 'subsidy'
      }
    ]
  },
  {
    id: 'environmental',
    title: 'Rapports Environnementaux et Conformité',
    description: 'Déclarations environnementales et rapports de conformité',
    declarations: [
      {
        id: 'efa',
        title: 'Zones de Focus Écologiques (EFA)',
        description: 'Déclaration des zones écologiques',
        progress: 0,
        status: 'À commencer',
        category: 'environmental'
      },
      {
        id: 'eau',
        title: 'Déclaration d\'Eau Agricole',
        description: 'Utilisation et gestion de l\'eau',
        progress: 0,
        status: 'À commencer',
        category: 'environmental'
      },
      {
        id: 'carbone',
        title: 'Bilan Carbone',
        description: 'Évaluation de l\'empreinte carbone',
        progress: 0,
        status: 'À commencer',
        category: 'environmental'
      }
    ]
  },
  {
    id: 'livestock',
    title: 'Gestion des Animaux et des Cultures',
    description: 'Déclarations liées aux animaux et aux cultures',
    declarations: [
      {
        id: 'identification-animaux',
        title: 'Identification et Enregistrement des Animaux',
        description: 'Suivi et identification du bétail',
        progress: 0,
        status: 'À commencer',
        category: 'livestock'
      },
      {
        id: 'phytosanitaires',
        title: 'Rapport sur l\'Utilisation des Produits Phytosanitaires',
        description: 'Utilisation des produits de protection des cultures',
        progress: 0,
        status: 'À commencer',
        category: 'livestock'
      },
      {
        id: 'bien-etre',
        title: 'Déclaration de Bien-être Animal',
        description: 'Conditions d\'élevage et bien-être animal',
        progress: 0,
        status: 'À commencer',
        category: 'livestock'
      }
    ]
  },
  {
    id: 'tax',
    title: 'Déclarations Fiscales et Sociales',
    description: 'Déclarations des taxes et charges sociales',
    declarations: [
      {
        id: 'cotisation',
        title: 'Cotisation Agricole (Déclaration des Salaires)',
        description: 'Déclaration des charges sociales',
        progress: 0,
        status: 'À commencer',
        category: 'tax'
      },
      {
        id: 'tva',
        title: 'Déclaration de TVA Agricole',
        description: 'Déclaration de la TVA pour activités agricoles',
        progress: 0,
        status: 'À commencer',
        category: 'tax'
      }
    ]
  }
];

export function PublicDeclarations() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const getCategoryProgress = (category: Category) => {
    const totalDeclarations = category.declarations.length;
    const completedDeclarations = category.declarations.filter(d => d.progress === 100).length;
    return (completedDeclarations / totalDeclarations) * 100;
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  if (selectedCategory && selectedCategoryData) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour aux catégories
        </button>
        
        <h2 className="text-2xl font-bold mb-4">{selectedCategoryData.title}</h2>
        <p className="text-gray-600 mb-6">{selectedCategoryData.description}</p>

        <div className="grid grid-cols-1 gap-6">
          {selectedCategoryData.declarations.map((declaration) => (
            <Link
              key={declaration.id}
              to={`/declarations/${declaration.id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
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
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => {
        const progress = getCategoryProgress(category);
        
        return (
          <Card
            key={category.id}
            className="h-full hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {category.title}
                </CardTitle>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {category.description}
              </p>
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {progress === 100 ? 'Complété' : 'En cours'}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
