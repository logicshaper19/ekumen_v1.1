import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Declaration {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  category: string;
  hasChanges?: boolean;
}

interface Category {
  id: string;
  title: string;
  description: string;
  declarations: Declaration[];
  hasChanges?: boolean;
}

export const categories: Category[] = [
  {
    id: 'registration',
    title: 'Formulaires d\'Enregistrement et Administratifs',
    description: 'Documents administratifs et enregistrements obligatoires',
    hasChanges: true,
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
        category: 'registration',
        hasChanges: true
      }
    ]
  },
  {
    id: 'environmental',
    title: 'Rapports Environnementaux et Conformité',
    description: 'Déclarations environnementales et rapports de conformité',
    declarations: [
      {
        id: 'engrais-sols',
        title: 'Gestion des Engrais et Sols',
        description: 'Déclaration sur la gestion des engrais et la qualité des sols',
        progress: 98,
        status: 'En cours',
        category: 'environmental'
      },
      {
        id: 'phytosanitaires',
        title: 'Rapport sur l\'Utilisation des Produits Phytosanitaires',
        description: 'Utilisation des produits de protection des cultures',
        progress: 98,
        status: 'En cours',
        category: 'environmental'
      },
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
    id: 'health-safety',
    title: 'Santé et Sécurité',
    description: 'Rapports de conformité en matière de santé et sécurité',
    declarations: [
      {
        id: 'conformite-sante-securite',
        title: 'Conformité en Santé et Sécurité',
        description: 'Rapport de conformité aux normes de santé et sécurité',
        progress: 98,
        status: 'En cours',
        category: 'health-safety'
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
    id: 'livestock',
    title: 'Gestion des Animaux et des Cultures',
    description: 'Déclarations liées aux animaux et aux cultures',
    hasChanges: true,
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
  const navigate = useNavigate();
  
  const getCategoryProgress = (category: Category) => {
    const totalDeclarations = category.declarations.length;
    const completedDeclarations = category.declarations.filter(d => d.progress === 100).length;
    return (completedDeclarations / totalDeclarations) * 100;
  };

  const handleDeclarationClick = (declarationId: string) => {
    navigate(`/dashboard/declarations/${declarationId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Déclarations Publiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const progress = getCategoryProgress(category);
          
          return (
            <Card
              key={category.id}
              className="h-full hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/dashboard/declarations/categories/${category.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">
                      {category.title}
                    </CardTitle>
                    {category.hasChanges && (
                      <span className="inline-flex px-3 py-1 rounded-full text-orange-600 bg-orange-100/80 text-sm">
                        Réglementation évolutive
                      </span>
                    )}
                  </div>
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
    </div>
  );
}
