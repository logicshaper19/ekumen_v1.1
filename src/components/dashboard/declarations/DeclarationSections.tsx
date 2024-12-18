import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, FileText } from 'lucide-react';

interface SectionsProps {
  changes: string[];
  risks: string[];
  onHelpClick: () => void;
  onFormClick: () => void;
}

export function DeclarationSections({ changes, risks, onHelpClick, onFormClick }: SectionsProps) {
  return (
    <>
      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Changes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Évolutions et changements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {changes.map((change, index) => (
                <p key={index} className="text-gray-600">- {change}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risks Section */}
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Risques pour mon exploitation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {risks.map((risk, index) => (
                <p key={index} className="text-red-600">- {risk}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="mb-2">
            <HelpCircle className="w-8 h-8 mx-auto text-teal-600 mb-2" />
            <h3 className="text-lg font-medium">Besoin d'aide?</h3>
            <p className="text-sm text-gray-600 mb-4">Obtenez de l'aide d'un conseiller expert</p>
          </div>
          <Button onClick={onHelpClick} className="w-full">
            Besoin d'aide
          </Button>
        </div>

        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="mb-2">
            <FileText className="w-8 h-8 mx-auto text-teal-600 mb-2" />
            <h3 className="text-lg font-medium">Remplir un formulaire?</h3>
            <p className="text-sm text-gray-600 mb-4">Accédez au formulaire détaillé et à l'aide au remplissage</p>
          </div>
          <Button onClick={onFormClick} className="w-full">
            Accéder au formulaire
          </Button>
        </div>
      </div>
    </>
  );
}
