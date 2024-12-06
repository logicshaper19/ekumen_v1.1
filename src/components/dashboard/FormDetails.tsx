import React from 'react';
import { DetailedForm } from '../../types/dashboard';
import { Calendar, CheckCircle2, AlertCircle, ArrowLeft, ClipboardList } from 'lucide-react';
import { FormResolutionSteps } from './FormResolutionSteps';

interface FormDetailsProps {
  form: DetailedForm;
  onBack: () => void;
}

export function FormDetails({ form, onBack }: FormDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm text-black hover:text-black/80 font-medium flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour
        </button>
        {form.dueDate && (
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-500">
              Échéance: {new Date(form.dueDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
          {form.completion === 100 ? (
            <CheckCircle2 className="h-6 w-6 text-black" />
          ) : (
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progression Globale</span>
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

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-black mr-2" />
              Informations Capturées
            </h2>
            {form.capturedFields ? (
              <dl className="space-y-3">
                {Object.entries(form.capturedFields).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-600">{key}:</dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm text-gray-500">Aucune information capturée</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ClipboardList className="h-5 w-5 text-yellow-500 mr-2" />
              Informations en Attente
            </h2>
            {form.pendingFields ? (
              <ul className="space-y-2">
                {form.pendingFields.map((field) => (
                  <li key={field} className="flex items-center text-sm text-gray-600">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    {field}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Aucune information en attente</p>
            )}
          </div>
        </div>

        <FormResolutionSteps
          steps={[
            {
              id: '1',
              title: 'Rassembler les Documents Requis',
              description: 'Collecter tous les documents justificatifs nécessaires pour compléter le formulaire.',
              deadline: '2024-03-15',
              status: 'in-progress',
              priority: 'high'
            },
            {
              id: '2',
              title: 'Vérification des Données',
              description: 'Vérifier l\'exactitude des informations déjà saisies et compléter les champs manquants.',
              deadline: '2024-03-20',
              status: 'pending',
              priority: 'medium'
            },
            {
              id: '3',
              title: 'Validation Finale',
              description: 'Révision complète du formulaire avant soumission finale.',
              deadline: '2024-03-25',
              status: 'pending',
              priority: 'low'
            }
          ]}
        />
      </div>
    </div>
  );
}