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
        title: 'Inventaire du cheptel',
        description: 'Vérifier les numéros d\'identification de tous les animaux',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Mise à jour du registre d\'élevage',
        description: 'Enregistrer tous les mouvements d\'animaux (naissances, décès, ventes)',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Contrôle sanitaire',
        description: 'Vérifier les dates de vaccination et traitements vétérinaires',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Vérification des boucles',
        description: 'Contrôler l\'état des boucles d\'identification et remplacer si nécessaire',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Notification des mouvements',
        description: 'Déclarer tous les mouvements sur le portail de l\'EDE',
        dueDate: '2024-03-10',
        priority: 'Normal'
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
        title: 'Mise à jour du RPG',
        description: 'Vérifier et actualiser les limites de parcelles sur TelePAC',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Déclaration des cultures',
        description: 'Renseigner les cultures prévues pour chaque îlot',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Calcul des SIE',
        description: 'Identifier et mesurer les Surfaces d\'Intérêt Écologique',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Vérification des critères',
        description: 'Contrôler le respect des critères de verdissement',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Finalisation du dossier',
        description: 'Rassembler les justificatifs et signer la déclaration',
        dueDate: '2024-03-10',
        priority: 'Normal'
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
    progress: 98,
    capturedInfo: [
      { label: 'Certiphyto N°', value: 'CP123456' },
      { label: 'Surface traitée', value: '85 hectares' },
      { label: 'Produits utilisés', value: '12 références' },
      { label: 'Local phytosanitaire', value: 'Conforme aux normes' }
    ],
    pendingInfo: [
      { label: 'Registre des traitements' },
      { label: 'Factures des produits' }
    ],
    resolutionSteps: [
      {
        title: 'Inventaire des produits',
        description: 'Dresser la liste complète des produits avec leurs numéros AMM',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Mise à jour du registre phytosanitaire',
        description: 'Documenter chaque traitement avec dates, doses et conditions météo',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Vérification des ZNT',
        description: 'Confirmer le respect des Zones Non Traitées pour chaque parcelle',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Contrôle du local',
        description: 'Vérifier la conformité du stockage et l\'affichage réglementaire',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Bilan des pratiques alternatives',
        description: 'Documenter les méthodes de lutte alternatives utilisées',
        dueDate: '2024-03-10',
        priority: 'Normal'
      }
    ]
  },
  'conformite-sante-securite': {
    id: 'conformite-sante-securite',
    title: 'Conformité en Santé et Sécurité',
    description: 'Rapport de conformité aux normes de santé et sécurité',
    progress: 98,
    capturedInfo: [
      { label: 'Document unique', value: 'Mis à jour le 10/01/2024' },
      { label: 'Nombre d\'employés', value: '5' },
      { label: 'Formation sécurité', value: 'Réalisée le 05/01/2024' },
      { label: 'Médecine du travail', value: 'Visites à jour' }
    ],
    pendingInfo: [
      { label: 'Attestations formations' },
      { label: 'Registre des accidents' },
      { label: 'Fiches de postes mises à jour' }
    ],
    resolutionSteps: [
      {
        title: 'Mise à jour du Document Unique',
        description: 'Évaluer les risques pour chaque poste de travail',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Vérification des équipements',
        description: 'Contrôler tous les équipements de protection individuelle',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Formation des employés',
        description: 'Organiser les formations sécurité et premiers secours',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Mise à jour des protocoles',
        description: 'Réviser les procédures d\'urgence et affichages obligatoires',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Audit interne',
        description: 'Réaliser un audit complet des installations et pratiques',
        dueDate: '2024-03-10',
        priority: 'Normal'
      }
    ]
  },
  'engrais-sols': {
    id: 'engrais-sols',
    title: 'Gestion des Engrais et Sols',
    description: 'Déclaration sur la gestion des engrais et la qualité des sols',
    progress: 98,
    capturedInfo: [
      { label: 'Surface traitée', value: '120 hectares' },
      { label: 'Type d\'engrais principal', value: 'NPK organique' },
      { label: 'Dernière analyse de sol', value: '15/01/2024' },
      { label: 'pH moyen du sol', value: '6.8' }
    ],
    pendingInfo: [
      { label: 'Plan de fertilisation 2024' },
      { label: 'Registre d\'épandage mis à jour' }
    ],
    resolutionSteps: [
      {
        title: 'Analyse complète des sols',
        description: 'Réaliser des prélèvements et analyses de sol pour chaque parcelle',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Établir le plan de fertilisation',
        description: 'Calculer les besoins en nutriments pour chaque culture',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Mise à jour du registre d\'épandage',
        description: 'Documenter toutes les applications d\'engrais avec dates et quantités',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Vérification des zones sensibles',
        description: 'Identifier et cartographier les zones à proximité des cours d\'eau',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Validation du plan',
        description: 'Faire valider le plan par un conseiller agronomique',
        dueDate: '2024-03-10',
        priority: 'Normal'
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
        title: 'Évaluation des conditions de logement',
        description: 'Mesurer les surfaces et vérifier la conformité des installations',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Contrôle des points d\'eau',
        description: 'Vérifier l\'accès et le fonctionnement des abreuvoirs',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Évaluation de l\'alimentation',
        description: 'Contrôler les rations et l\'accès aux mangeoires',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Vérification de la ventilation',
        description: 'Mesurer la qualité de l\'air et le fonctionnement du système',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Documentation des soins',
        description: 'Mettre à jour le registre des soins et interventions',
        dueDate: '2024-03-10',
        priority: 'Normal'
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
        title: 'Préparation des bulletins',
        description: 'Rassembler tous les bulletins de salaire du trimestre',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Calcul des cotisations',
        description: 'Détailler les bases de calcul pour chaque type de cotisation',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Vérification des exonérations',
        description: 'Identifier les dispositifs d\'allègement applicables',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Préparation de la DSN',
        description: 'Remplir la Déclaration Sociale Nominative',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Validation des paiements',
        description: 'Programmer les virements pour les cotisations',
        dueDate: '2024-03-10',
        priority: 'Normal'
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
        title: 'Classement des factures',
        description: 'Trier les factures par taux de TVA et par type',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Calcul de la TVA collectée',
        description: 'Totaliser la TVA sur les ventes par taux',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Calcul de la TVA déductible',
        description: 'Vérifier l\'éligibilité des dépenses à déduction',
        dueDate: '2024-02-28',
        priority: 'Normal'
      },
      {
        title: 'Régularisations',
        description: 'Identifier les opérations nécessitant régularisation',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Transmission déclaration',
        description: 'Remplir et envoyer la déclaration sur impots.gouv.fr',
        dueDate: '2024-03-10',
        priority: 'Normal'
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
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour aux déclarations
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{declaration.title}</h1>
          {declaration.hasChanges && (
            <div className="inline-flex px-3 py-1 rounded-full text-orange-600 bg-orange-100/80 text-center items-center justify-center text-sm">
              1 réglementation évolutive
            </div>
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
          <div className="flex items-center justify-between">
            <CardTitle>Plan de Résolution</CardTitle>
            <div className="flex gap-2">
              <button
                onClick={() => {/* TODO: Implement help request */}}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Demander de l'aide
              </button>
              <button
                onClick={() => {/* TODO: Implement add to tasks */}}
                className="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-300 rounded-lg hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Ajouter à mes tâches
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {declaration.resolutionSteps.map((step, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4" />
                    <span>Échéance: {step.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
