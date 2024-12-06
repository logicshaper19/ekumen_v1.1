import React from 'react';
import { Building2, MapPin } from 'lucide-react';

interface BusinessInfoStepProps {
  formData: {
    siretNumber: string;
    farmAddress: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BusinessInfoStep({ formData, onChange, onNext, onBack }: BusinessInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Numéro SIRET</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              pattern="[0-9]{14}"
              value={formData.siretNumber}
              onChange={(e) => onChange('siretNumber', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="12345678901234"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Entrez votre numéro SIRET à 14 chiffres</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse de l'Exploitation</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              required
              value={formData.farmAddress}
              onChange={(e) => onChange('farmAddress', e.target.value)}
              rows={3}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Entrez l'adresse de votre exploitation"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Il s'agit de l'adresse où se situe votre exploitation</p>
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
          Suivant
        </button>
      </div>
    </form>
  );
}