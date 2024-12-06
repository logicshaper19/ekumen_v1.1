import React from 'react';
import { Wheat, Scale } from 'lucide-react';
import { FarmType } from '../../types/farmer';

interface FarmDetailsStepProps {
  formData: {
    farmType: FarmType;
    farmingDetails: string;
    farmSize: number;
  };
  onChange: (field: string, value: string | number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function FarmDetailsStep({ formData, onChange, onSubmit, onBack }: FarmDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type d'Exploitation</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Wheat className="h-5 w-5 text-gray-400" />
            </div>
            <select
              required
              value={formData.farmType}
              onChange={(e) => onChange('farmType', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="">Sélectionnez le type d'exploitation</option>
              <option value="crop">Culture</option>
              <option value="livestock">Élevage</option>
              <option value="mixed">Mixte</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Que cultivez-vous ?
          </label>
          <div className="mt-1">
            <textarea
              required
              value={formData.farmingDetails}
              onChange={(e) => onChange('farmingDetails', e.target.value)}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Décrivez vos animaux et/ou cultures..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Taille de l'Exploitation (Hectares)</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Scale className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              required
              min="0"
              step="0.1"
              value={formData.farmSize}
              onChange={(e) => onChange('farmSize', parseFloat(e.target.value))}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="0.0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Retour
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Terminer l'Inscription
        </button>
      </div>
    </form>
  );
}