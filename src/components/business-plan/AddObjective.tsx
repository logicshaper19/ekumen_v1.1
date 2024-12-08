import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Duration = 'court' | 'moyen' | 'long';

export function AddObjective() {
  const navigate = useNavigate();
  const [duration, setDuration] = React.useState<Duration>('court');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    navigate('/business-plan'); // Return to business plan after submission
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/business-plan')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Ajouter un Objectif Stratégique</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Objective Title */}
            <div className="space-y-2">
              <Label htmlFor="objective">Objectif Stratégique</Label>
              <Input
                id="objective"
                placeholder="Entrez votre objectif stratégique"
                className="w-full"
              />
            </div>

            {/* Goals and Outcomes */}
            <div className="space-y-2">
              <Label htmlFor="goals">Buts et Résultats Attendus</Label>
              <Textarea
                id="goals"
                placeholder="Décrivez les buts spécifiques et les résultats attendus"
                className="min-h-[100px]"
              />
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <Label>Durée</Label>
              <RadioGroup
                defaultValue="court"
                onValueChange={(value) => setDuration(value as Duration)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="court" id="court" />
                  <Label htmlFor="court">Court terme (moins d'un an)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moyen" id="moyen" />
                  <Label htmlFor="moyen">Moyen terme (1-3 ans)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long terme (plus de 3 ans)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes Additionnelles</Label>
              <Textarea
                id="notes"
                placeholder="Ajoutez des notes ou des détails supplémentaires"
                className="min-h-[150px]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-teal-700 hover:bg-teal-800 text-white px-8"
              >
                Enregistrer l'objectif
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
