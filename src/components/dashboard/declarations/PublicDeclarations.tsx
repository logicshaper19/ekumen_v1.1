import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Declaration {
  id: string;
  title: string;
  description: string;
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
        category: 'registration'
      },
      {
        id: 'foncier-rural',
        title: 'Foncier Rural',
        description: 'Déclaration des terres agricoles et leur statut',
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
        category: 'environmental'
      },
      {
        id: 'phytosanitaires',
        title: 'Rapport sur l\'Utilisation des Produits Phytosanitaires',
        description: 'Utilisation des produits de protection des cultures',
        category: 'environmental'
      },
      {
        id: 'efa',
        title: 'Zones de Focus Écologiques (EFA)',
        description: 'Déclaration des zones écologiques',
        category: 'environmental'
      },
      {
        id: 'eau',
        title: 'Déclaration d\'Eau Agricole',
        description: 'Utilisation et gestion de l\'eau',
        category: 'environmental'
      },
      {
        id: 'carbone',
        title: 'Bilan Carbone',
        description: 'Évaluation de l\'empreinte carbone',
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
        category: 'subsidy'
      },
      {
        id: 'aides',
        title: 'Demandes d\'Aides et Subventions',
        description: 'Autres demandes de subventions agricoles',
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
        category: 'livestock'
      },
      {
        id: 'bien-etre',
        title: 'Déclaration de Bien-être Animal',
        description: 'Conditions d\'élevage et bien-être animal',
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
        category: 'tax'
      },
      {
        id: 'tva',
        title: 'Déclaration de TVA Agricole',
        description: 'Déclaration de la TVA pour activités agricoles',
        category: 'tax'
      }
    ]
  }
];

export function PublicDeclarations() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{category.title}</span>
              {category.hasChanges && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Mis à jour
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{category.description}</p>
            <div className="space-y-4">
              {category.declarations.map((declaration) => (
                <div
                  key={declaration.id}
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/categories/${category.id}/declarations/${declaration.id}/overview`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{declaration.title}</h3>
                        {declaration.hasChanges && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Mis à jour
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{declaration.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
