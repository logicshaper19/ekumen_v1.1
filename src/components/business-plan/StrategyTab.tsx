import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function StrategyTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Add Objective Button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => navigate('/business-plan/add-objective')}
          className="bg-teal-700 text-white hover:bg-teal-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter vos objectifs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stratégie d'Exploitation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Axes Stratégiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg hover:bg-accent/50 transition-colors">
                <div className="text-primary font-semibold mb-2">Diversification</div>
                <p className="text-sm text-gray-600">Introduction de nouvelles cultures à haute valeur ajoutée</p>
              </div>
              <div className="p-4 bg-white rounded-lg hover:bg-accent/50 transition-colors">
                <div className="text-primary font-semibold mb-2">Durabilité</div>
                <p className="text-sm text-gray-600">Transition vers des pratiques agricoles plus durables</p>
              </div>
              <div className="p-4 bg-white rounded-lg hover:bg-accent/50 transition-colors">
                <div className="text-primary font-semibold mb-2">Innovation</div>
                <p className="text-sm text-gray-600">Adoption de technologies agricoles de précision</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Plan d'Action</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">1</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Court Terme (0-6 mois)</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Analyse des sols et planification des rotations</li>
                    <li>• Formation aux nouvelles technologies</li>
                    <li>• Étude de marché pour nouvelles cultures</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">2</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Moyen Terme (6-18 mois)</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Mise en place de l'agriculture de précision</li>
                    <li>• Développement des circuits courts</li>
                    <li>• Certification environnementale</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">3</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium">Long Terme (18+ mois)</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Extension des surfaces cultivées</li>
                    <li>• Investissement dans le stockage</li>
                    <li>• Développement de la marque</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
