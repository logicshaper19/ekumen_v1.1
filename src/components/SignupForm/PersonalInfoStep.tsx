import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

export function PersonalInfoStep({ formData, onChange, onNext }: PersonalInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="Jean"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="Dupont"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse Email</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="jean.dupont@exemple.fr"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="+33 1 23 45 67 89"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
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