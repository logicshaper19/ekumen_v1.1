import React, { useState } from 'react';
import { DetailedForm } from '../../types/dashboard';
import { Calendar, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { FormDetails } from './FormDetails';

interface FormListProps {
  forms: DetailedForm[];
  onBack: () => void;
  categoryTitle: string;
}

export function FormList({ forms, onBack, categoryTitle }: FormListProps) {
  const [selectedForm, setSelectedForm] = useState<DetailedForm | null>(null);

  if (selectedForm) {
    return <FormDetails form={selectedForm} onBack={() => setSelectedForm(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{categoryTitle}</h2>
        <button
          onClick={onBack}
          className="text-sm text-black hover:text-black/80 font-medium flex items-center"
        >
          Back to Categories
        </button>
      </div>

      <div className="grid gap-6">
        {forms.map((form) => (
          <div key={form.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
                  {form.completion === 100 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : form.dueDate && new Date(form.dueDate) < new Date() ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : null}
                </div>
                <p className="text-sm text-gray-500 mt-1">{form.description}</p>
              </div>
              <button 
                onClick={() => setSelectedForm(form)}
                className="text-black hover:text-black/80"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {form.dueDate && (
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Échéance: {new Date(form.dueDate).toLocaleDateString('fr-FR')}</span>
              </div>
            )}

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progression</span>
                <span className="text-sm font-medium text-gray-900">{form.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    form.completion === 100
                      ? 'bg-black'
                      : form.completion >= 50
                      ? 'bg-black/80'
                      : 'bg-yellow-500'
                  }`}
                  style={{ width: `${form.completion}%` }}
                />
              </div>
            </div>
            {form.completion < 100 && (
              <div className="mt-4 text-sm text-gray-500">
                {form.completion === 0
                  ? 'Formulaire non commencé'
                  : 'En cours de completion'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}