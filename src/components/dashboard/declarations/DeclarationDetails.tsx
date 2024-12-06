import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, InfoIcon } from 'lucide-react';

interface CapturedInfo {
  label: string;
  value: string;
}

interface PendingInfo {
  label: string;
  description?: string;
}

interface ResolutionStep {
  title: string;
  description: string;
  dueDate: string;
  priority: 'Urgent' | 'Important' | 'Normal';
}

interface DeclarationData {
  id: string;
  title: string;
  description: string;
  progress: number;
  capturedInfo: CapturedInfo[];
  pendingInfo: PendingInfo[];
  resolutionSteps: ResolutionStep[];
}

const declarations: Record<string, DeclarationData> = {
  'rpb': {
    id: 'rpb',
    title: 'Régime de Paiement de Base (RPB)',
    description: 'Déclaration pour les aides PAC',
    progress: 50,
    capturedInfo: [
      { label: 'Numéro Pacage', value: '031234567' },
      { label: 'Surface Agricole Utile', value: '85 hectares' },
      { label: 'Cultures principales', value: 'Blé tendre, Maïs, Tournesol' },
      { label: 'DPB activés', value: '85 droits' }
    ],
    pendingInfo: [
      { label: 'Déclaration surfaces d\'intérêt écologique' },
      { label: 'Photos géolocalisées des parcelles' },
      { label: 'Justificatifs de propriété/fermage' }
    ],
    resolutionSteps: [
      {
        title: 'Rassembler les Documents Requis',
        description: 'Collecter tous les documents justificatifs nécessaires pour compléter le formulaire.',
        dueDate: '2024-03-15',
        priority: 'Urgent'
      },
      {
        title: 'Vérification des Données',
        description: 'Vérifier l\'exactitude des informations déjà saisies et compléter les champs manquants.',
        dueDate: '2024-03-20',
        priority: 'Important'
      },
      {
        title: 'Validation Finale',
        description: 'Révision complète du formulaire avant soumission finale.',
        dueDate: '2024-03-25',
        priority: 'Normal'
      }
    ]
  },
  'declaration-activite': {
    id: 'declaration-activite',
    title: 'Déclaration d\'Activité Agricole',
    description: 'Enregistrement officiel de l\'activité',
    progress: 75,
    capturedInfo: [
      { label: 'SIRET', value: '12345678900010' },
      { label: 'Adresse exploitation', value: '123 Route des Champs, 31000 Toulouse' },
      { label: 'Type d\'exploitation', value: 'Polyculture-élevage' }
    ],
    pendingInfo: [
      { label: 'Attestation MSA' },
      { label: 'Certificat de conformité' }
    ],
    resolutionSteps: [
      {
        title: 'Compléter le Dossier',
        description: 'Obtenir les attestations manquantes',
        dueDate: '2024-02-28',
        priority: 'Important'
      }
    ]
  },
  'identification-animaux': {
    id: 'identification-animaux',
    title: 'Identification et Enregistrement des Animaux',
    description: 'Déclaration du cheptel',
    progress: 60,
    capturedInfo: [
      { label: 'Numéro EDE', value: 'FR31123456' },
      { label: 'Type d\'élevage', value: 'Bovin laitier' },
      { label: 'Nombre d\'animaux', value: '45 têtes' }
    ],
    pendingInfo: [
      { label: 'Registre d\'élevage à jour' },
      { label: 'Certificats sanitaires' }
    ],
    resolutionSteps: [
      {
        title: 'Mise à jour registre',
        description: 'Actualiser le registre d\'élevage',
        dueDate: '2024-02-15',
        priority: 'Urgent'
      }
    ]
  }
};

export function DeclarationDetails() {
  const { id } = useParams<{ id: string }>();
  const declaration = declarations[id || ''];

  if (!declaration) {
    return <div>Déclaration non trouvée</div>;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'text-red-500';
      case 'Important':
        return 'text-orange-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link to="/declarations" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour aux déclarations
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{declaration.title}</h1>
          <InfoIcon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Progression Globale</span>
            <span className="text-sm font-medium">{declaration.progress}%</span>
          </div>
          <Progress value={declaration.progress} className="h-2" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Informations Capturées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              {declaration.capturedInfo.map((info, index) => (
                <div key={index}>
                  <dt className="text-sm text-gray-600">{info.label}:</dt>
                  <dd className="text-sm font-medium mt-1">{info.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Informations en Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {declaration.pendingInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span className="text-sm">{info.label}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan de Résolution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {declaration.resolutionSteps.map((step, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <span className={`text-sm font-medium ${getPriorityColor(step.priority)}`}>
                    {step.priority}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Échéance: {step.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
