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
  hasChanges?: boolean;
  capturedInfo: CapturedInfo[];
  pendingInfo: PendingInfo[];
  resolutionSteps: ResolutionStep[];
}

const declarations: Record<string, DeclarationData> = {
  'declaration-activite': {
    id: 'declaration-activite',
    title: 'Déclaration d\'Activité Agricole',
    description: 'Enregistrement officiel de votre activité agricole',
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
  'foncier-rural': {
    id: 'foncier-rural',
    title: 'Foncier Rural',
    description: 'Déclaration des terres agricoles et leur statut',
    progress: 60,
    hasChanges: true,
    capturedInfo: [
      { label: 'Surface totale', value: '150 hectares' },
      { label: 'Statut principal', value: 'Propriétaire exploitant' },
      { label: 'Commune principale', value: 'Saint-Martin-du-Touch' }
    ],
    pendingInfo: [
      { label: 'Bail rural (parcelles en fermage)' },
      { label: 'Relevé parcellaire MSA' },
      { label: 'Plan cadastral mis à jour' }
    ],
    resolutionSteps: [
      {
        title: 'Mise à jour cadastrale',
        description: 'Obtenir le plan cadastral actualisé auprès de la mairie',
        dueDate: '2024-03-15',
        priority: 'Important'
      },
      {
        title: 'Régularisation des baux',
        description: 'Finaliser les contrats de fermage en cours',
        dueDate: '2024-03-30',
        priority: 'Urgent'
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
  },
  'pac': {
    id: 'pac',
    title: 'PAC - Politique Agricole Commune',
    description: 'Demande de paiement unique de la PAC',
    progress: 30,
    capturedInfo: [
      { label: 'Numéro Pacage', value: '031234567' },
      { label: 'Surface déclarée', value: '85 hectares' },
      { label: 'Droits à paiement de base', value: '85 DPB' }
    ],
    pendingInfo: [
      { label: 'Relevé parcellaire graphique' },
      { label: 'Attestation d\'assurance récolte' },
      { label: 'Justificatifs des SIE' }
    ],
    resolutionSteps: [
      {
        title: 'Mise à jour RPG',
        description: 'Actualiser le registre parcellaire graphique',
        dueDate: '2024-03-20',
        priority: 'Important'
      },
      {
        title: 'Vérification éligibilité',
        description: 'Contrôler les critères d\'éligibilité aux aides',
        dueDate: '2024-03-25',
        priority: 'Urgent'
      }
    ]
  },
  'aides': {
    id: 'aides',
    title: 'Demandes d\'Aides et Subventions',
    description: 'Autres demandes de subventions agricoles',
    progress: 20,
    capturedInfo: [
      { label: 'Type d\'aide', value: 'Aide à l\'installation' },
      { label: 'Montant demandé', value: '40 000 €' },
      { label: 'Date d\'installation', value: '01/01/2024' }
    ],
    pendingInfo: [
      { label: 'Plan d\'entreprise' },
      { label: 'Diplômes et certificats' },
      { label: 'Étude économique prévisionnelle' }
    ],
    resolutionSteps: [
      {
        title: 'Finalisation dossier',
        description: 'Compléter les pièces manquantes du dossier',
        dueDate: '2024-04-15',
        priority: 'Important'
      }
    ]
  },
  'efa': {
    id: 'efa',
    title: 'Zones de Focus Écologiques (EFA)',
    description: 'Déclaration des zones écologiques',
    progress: 40,
    capturedInfo: [
      { label: 'Surface EFA totale', value: '7.5 hectares' },
      { label: 'Types d\'EFA', value: 'Haies, jachères mellifères' },
      { label: 'Pourcentage SAU', value: '5%' }
    ],
    pendingInfo: [
      { label: 'Cartographie des EFA' },
      { label: 'Photos des éléments topographiques' }
    ],
    resolutionSteps: [
      {
        title: 'Cartographie',
        description: 'Réaliser la cartographie détaillée des EFA',
        dueDate: '2024-03-10',
        priority: 'Important'
      }
    ]
  },
  'eau': {
    id: 'eau',
    title: 'Déclaration d\'Eau Agricole',
    description: 'Utilisation et gestion de l\'eau',
    progress: 45,
    capturedInfo: [
      { label: 'Volume annuel prélevé', value: '50 000 m³' },
      { label: 'Type de ressource', value: 'Forage + Cours d\'eau' },
      { label: 'Surface irriguée', value: '45 hectares' }
    ],
    pendingInfo: [
      { label: 'Relevés des compteurs' },
      { label: 'Plan de gestion de l\'irrigation' }
    ],
    resolutionSteps: [
      {
        title: 'Relevés mensuels',
        description: 'Effectuer les relevés de compteurs mensuels',
        dueDate: '2024-02-28',
        priority: 'Normal'
      }
    ]
  },
  'carbone': {
    id: 'carbone',
    title: 'Bilan Carbone',
    description: 'Évaluation de l\'empreinte carbone',
    progress: 25,
    capturedInfo: [
      { label: 'Émissions totales', value: '250 tCO2e/an' },
      { label: 'Principaux postes', value: 'Énergie, Fertilisation' },
      { label: 'Stockage carbone', value: '50 tCO2e/an' }
    ],
    pendingInfo: [
      { label: 'Factures énergétiques' },
      { label: 'Registre des pratiques culturales' },
      { label: 'Inventaire du matériel' }
    ],
    resolutionSteps: [
      {
        title: 'Collecte des données',
        description: 'Rassembler les données de consommation',
        dueDate: '2024-04-01',
        priority: 'Normal'
      }
    ]
  },
  'phytosanitaires': {
    id: 'phytosanitaires',
    title: 'Rapport sur l\'Utilisation des Produits Phytosanitaires',
    description: 'Utilisation des produits de protection des cultures',
    progress: 55,
    capturedInfo: [
      { label: 'Surface traitée', value: '80 hectares' },
      { label: 'Nombre de traitements', value: '12 interventions' },
      { label: 'IFT moyen', value: '1.8' }
    ],
    pendingInfo: [
      { label: 'Registre phytosanitaire' },
      { label: 'Justificatifs d\'achat' },
      { label: 'Certificat Certiphyto' }
    ],
    resolutionSteps: [
      {
        title: 'Mise à jour registre',
        description: 'Compléter le registre phytosanitaire',
        dueDate: '2024-02-20',
        priority: 'Urgent'
      }
    ]
  },
  'bien-etre': {
    id: 'bien-etre',
    title: 'Déclaration de Bien-être Animal',
    description: 'Conditions d\'élevage et bien-être animal',
    progress: 70,
    capturedInfo: [
      { label: 'Type d\'élevage', value: 'Bovin laitier' },
      { label: 'Surface par animal', value: '10 m² / animal' },
      { label: 'Mode de logement', value: 'Stabulation libre' }
    ],
    pendingInfo: [
      { label: 'Plan des bâtiments' },
      { label: 'Registre sanitaire' }
    ],
    resolutionSteps: [
      {
        title: 'Audit bien-être',
        description: 'Réaliser l\'audit bien-être animal',
        dueDate: '2024-03-05',
        priority: 'Important'
      }
    ]
  },
  'cotisation': {
    id: 'cotisation',
    title: 'Cotisation Agricole (Déclaration des Salaires)',
    description: 'Déclaration des charges sociales',
    progress: 35,
    capturedInfo: [
      { label: 'Nombre de salariés', value: '3' },
      { label: 'Masse salariale', value: '75 000 €' },
      { label: 'Type de contrats', value: 'CDI, Saisonnier' }
    ],
    pendingInfo: [
      { label: 'Bulletins de salaire' },
      { label: 'Justificatifs des heures travaillées' },
      { label: 'Contrats de travail' }
    ],
    resolutionSteps: [
      {
        title: 'DSN mensuelle',
        description: 'Préparer la déclaration sociale nominative',
        dueDate: '2024-02-15',
        priority: 'Urgent'
      }
    ]
  },
  'tva': {
    id: 'tva',
    title: 'Déclaration de TVA Agricole',
    description: 'Déclaration de la TVA pour activités agricoles',
    progress: 40,
    capturedInfo: [
      { label: 'Régime TVA', value: 'Réel normal' },
      { label: 'CA annuel', value: '350 000 €' },
      { label: 'Période', value: 'Trimestre 1 2024' }
    ],
    pendingInfo: [
      { label: 'Factures d\'achat' },
      { label: 'Factures de vente' },
      { label: 'Justificatifs de TVA déductible' }
    ],
    resolutionSteps: [
      {
        title: 'Préparation déclaration',
        description: 'Rassembler les pièces comptables',
        dueDate: '2024-04-20',
        priority: 'Important'
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
          {declaration.hasChanges && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
              1 changement
            </span>
          )}
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
