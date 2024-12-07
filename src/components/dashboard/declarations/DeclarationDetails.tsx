import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, InfoIcon } from 'lucide-react';
import { FormLayout } from '@/components/ui/form-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface RegulationInfo {
  currentRegulation: Regulation;
  upcomingRegulation?: Regulation;
}

interface Regulation {
  title: string;
  description: string;
  effectiveDate: string;
  source?: string;
  changes?: string[];
}

interface DeclarationData {
  id: string;
  title: string;
  description: string;
  progress: number;
  isRegulated?: boolean;
  regulationInfo?: RegulationInfo;
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
    progress: 0,
    status: 'À commencer',
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Réglementation sur le Foncier Rural',
        description: 'Dispositions actuelles concernant la déclaration et la gestion des terres agricoles',
        effectiveDate: '2024-01-01',
        source: 'Ministère de l\'Agriculture'
      },
      upcomingRegulation: {
        title: 'Nouvelles mesures sur le Foncier Rural',
        description: 'Évolution des dispositions concernant la déclaration et la gestion des terres agricoles',
        effectiveDate: '2024-07-01',
        source: 'Ministère de l\'Agriculture',
        changes: [
          'Modification des critères de classification des terres',
          'Nouvelles exigences de documentation',
          'Introduction de mesures de protection environnementale'
        ]
      }
    },
    capturedInfo: [
      { label: 'Surface totale', value: '120 hectares' },
      { label: 'Type de sol', value: 'Mixte' },
      { label: 'Usage principal', value: 'Culture céréalière' }
    ],
    pendingInfo: [
      { label: 'Plan cadastral' },
      { label: 'Attestation de propriété' },
      { label: 'Étude de sol' }
    ],
    resolutionSteps: [
      {
        title: 'Documentation cadastrale',
        description: 'Rassembler les documents cadastraux',
        dueDate: '2024-03-15',
        priority: 'Normal'
      },
      {
        title: 'Analyse du sol',
        description: 'Effectuer les analyses de sol requises',
        dueDate: '2024-03-30',
        priority: 'Important'
      },
      {
        title: 'Plan d\'exploitation',
        description: 'Établir le plan d\'exploitation détaillé',
        dueDate: '2024-04-15',
        priority: 'Normal'
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
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'PAC 2023-2027',
        description: 'Cadre actuel de la Politique Agricole Commune',
        effectiveDate: '1er janvier 2023',
        source: 'Commission Européenne - DG AGRI'
      },
      upcomingRegulation: {
        title: 'Modifications PAC 2024',
        description: 'Ajustements et nouvelles mesures pour la PAC 2024',
        effectiveDate: '1er janvier 2024',
        source: 'Ministère de l\'Agriculture',
        changes: [
          'Renforcement des eco-schemes',
          'Nouvelles conditions pour les aides couplées',
          'Modification du calcul des surfaces d\'intérêt écologique',
          'Introduction de nouvelles mesures agro-environnementales'
        ]
      }
    },
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
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Réglementation sur l\'utilisation des produits phytosanitaires 2023',
        description: 'Cadre réglementaire actuel concernant l\'utilisation, le stockage et la traçabilité des produits phytosanitaires',
        effectiveDate: '1er janvier 2023',
        source: 'Ministère de l\'Agriculture et de la Souveraineté alimentaire'
      },
      upcomingRegulation: {
        title: 'Nouvelles mesures de réduction des produits phytosanitaires 2024',
        description: 'Renforcement des mesures de contrôle et nouvelles restrictions sur certains produits',
        effectiveDate: '1er janvier 2024',
        source: 'Plan Ecophyto 2024',
        changes: [
          'Introduction de nouvelles restrictions pour les produits contenant du glyphosate',
          'Élargissement des zones non traitées (ZNT) autour des points d\'eau',
          'Nouvelles exigences de formation pour les applicateurs',
          'Renforcement du suivi digital des applications de produits'
        ]
      }
    },
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
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Directives bien-être animal 2023',
        description: 'Réglementation actuelle sur les conditions d\'élevage et le bien-être animal',
        effectiveDate: '1er juillet 2023',
        source: 'Direction Générale de l\'Alimentation (DGAL)'
      },
      upcomingRegulation: {
        title: 'Nouvelles normes bien-être animal 2024',
        description: 'Renforcement des exigences en matière de bien-être animal',
        effectiveDate: '1er juillet 2024',
        source: 'Loi EGalim 2',
        changes: [
          'Nouvelles normes sur l\'espace minimal par animal',
          'Exigences renforcées sur l\'accès au plein air',
          'Obligation de vidéosurveillance dans les grands élevages',
          'Nouvelles normes sur l\'enrichissement du milieu de vie'
        ]
      }
    },
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
  },
  'produits-phytosanitaires': {
    id: 'produits-phytosanitaires',
    title: 'Rapport sur l\'Utilisation des Produits Phytosanitaires',
    description: 'Déclaration des pratiques phytosanitaires et respect des normes',
    progress: 60,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Réglementation sur l\'utilisation des produits phytosanitaires 2023',
        description: 'Cadre réglementaire actuel concernant l\'utilisation, le stockage et la traçabilité des produits phytosanitaires',
        effectiveDate: '1er janvier 2023',
        source: 'Ministère de l\'Agriculture et de la Souveraineté alimentaire'
      },
      upcomingRegulation: {
        title: 'Nouvelles mesures de réduction des produits phytosanitaires 2024',
        description: 'Renforcement des mesures de contrôle et nouvelles restrictions sur certains produits',
        effectiveDate: '1er janvier 2024',
        source: 'Plan Ecophyto 2024',
        changes: [
          'Introduction de nouvelles restrictions pour les produits contenant du glyphosate',
          'Élargissement des zones non traitées (ZNT) autour des points d\'eau',
          'Nouvelles exigences de formation pour les applicateurs',
          'Renforcement du suivi digital des applications de produits'
        ]
      }
    },
    capturedInfo: [
      { label: 'Certiphyto N°', value: 'CP123456' },
      { label: 'Surface traitée', value: '85 hectares' },
      { label: 'Produits utilisés', value: '12 références' }
    ],
    pendingInfo: [
      { label: 'Registre phytosanitaire à jour' },
      { label: 'Bordereau de suivi des déchets' }
    ],
    resolutionSteps: [
      {
        title: 'Inventaire des produits',
        description: 'Faire l\'inventaire complet des produits phytosanitaires en stock',
        dueDate: '2024-02-15',
        priority: 'Normal'
      },
      {
        title: 'Mise à jour du registre',
        description: 'Mettre à jour le registre des traitements phytosanitaires',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Vérification des ZNT',
        description: 'Contrôler le respect des zones non traitées',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Contrôle du local',
        description: 'Vérifier la conformité du local de stockage',
        dueDate: '2024-03-01',
        priority: 'Normal'
      },
      {
        title: 'Documentation des alternatives',
        description: 'Noter les méthodes alternatives utilisées',
        dueDate: '2024-03-05',
        priority: 'Normal'
      }
    ]
  },
  'bien-etre-animal': {
    id: 'bien-etre-animal',
    title: 'Déclaration de Bien-être Animal',
    description: 'Suivi et déclaration des conditions d\'élevage',
    progress: 40,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'Directives bien-être animal 2023',
        description: 'Réglementation actuelle sur les conditions d\'élevage et le bien-être animal',
        effectiveDate: '1er juillet 2023',
        source: 'Direction Générale de l\'Alimentation (DGAL)'
      },
      upcomingRegulation: {
        title: 'Nouvelles normes bien-être animal 2024',
        description: 'Renforcement des exigences en matière de bien-être animal',
        effectiveDate: '1er juillet 2024',
        source: 'Loi EGalim 2',
        changes: [
          'Nouvelles normes sur l\'espace minimal par animal',
          'Exigences renforcées sur l\'accès au plein air',
          'Obligation de vidéosurveillance dans les grands élevages',
          'Nouvelles normes sur l\'enrichissement du milieu de vie'
        ]
      }
    },
    capturedInfo: [
      { label: 'Type d\'élevage', value: 'Bovin laitier' },
      { label: 'Surface par animal', value: '10 m² / animal' },
      { label: 'Accès extérieur', value: 'Oui - Pâturage' }
    ],
    pendingInfo: [
      { label: 'Rapport vétérinaire annuel' },
      { label: 'Plan de prévention' }
    ],
    resolutionSteps: [
      {
        title: 'Évaluation des conditions',
        description: 'Vérifier les conditions de logement des animaux',
        dueDate: '2024-02-20',
        priority: 'Normal'
      },
      {
        title: 'Contrôle des points d\'eau',
        description: 'Vérifier l\'accès à l\'eau pour tous les animaux',
        dueDate: '2024-02-25',
        priority: 'Normal'
      },
      {
        title: 'Évaluation alimentation',
        description: 'Contrôler les pratiques d\'alimentation',
        dueDate: '2024-03-01',
        priority: 'Normal'
      },
      {
        title: 'Contrôle ventilation',
        description: 'Vérifier le système de ventilation',
        dueDate: '2024-03-05',
        priority: 'Normal'
      },
      {
        title: 'Documentation des soins',
        description: 'Mettre à jour le registre des soins',
        dueDate: '2024-03-10',
        priority: 'Normal'
      }
    ]
  },
  'pac': {
    id: 'pac',
    title: 'PAC - Politique Agricole Commune',
    description: 'Déclaration annuelle PAC',
    progress: 30,
    isRegulated: true,
    regulationInfo: {
      currentRegulation: {
        title: 'PAC 2023-2027',
        description: 'Cadre actuel de la Politique Agricole Commune',
        effectiveDate: '1er janvier 2023',
        source: 'Commission Européenne - DG AGRI'
      },
      upcomingRegulation: {
        title: 'Modifications PAC 2024',
        description: 'Ajustements et nouvelles mesures pour la PAC 2024',
        effectiveDate: '1er janvier 2024',
        source: 'Ministère de l\'Agriculture',
        changes: [
          'Renforcement des eco-schemes',
          'Nouvelles conditions pour les aides couplées',
          'Modification du calcul des surfaces d\'intérêt écologique',
          'Introduction de nouvelles mesures agro-environnementales'
        ]
      }
    },
    capturedInfo: [
      { label: 'Numéro Pacage', value: '031234567' },
      { label: 'Surface déclarée', value: '85 hectares' },
      { label: 'DPB', value: '70 droits activés' }
    ],
    pendingInfo: [
      { label: 'Photos géolocalisées' },
      { label: 'Justificatifs SIE' }
    ],
    resolutionSteps: [
      {
        title: 'Mise à jour parcellaire',
        description: 'Vérifier et mettre à jour les limites des parcelles',
        dueDate: '2024-03-15',
        priority: 'Normal'
      },
      {
        title: 'Déclaration cultures',
        description: 'Déclarer les cultures pour chaque parcelle',
        dueDate: '2024-03-20',
        priority: 'Normal'
      },
      {
        title: 'Calcul SIE',
        description: 'Calculer les Surfaces d\'Intérêt Écologique',
        dueDate: '2024-03-25',
        priority: 'Normal'
      },
      {
        title: 'Vérification conformité',
        description: 'Contrôler la conformité avec les exigences PAC',
        dueDate: '2024-03-30',
        priority: 'Normal'
      },
      {
        title: 'Finalisation dossier',
        description: 'Rassembler tous les justificatifs nécessaires',
        dueDate: '2024-04-05',
        priority: 'Normal'
      }
    ]
  },
};

export function DeclarationDetails() {
  const { id } = useParams<{ id: string }>();
  const declaration = declarations[id || ''];

  if (!declaration) {
    return <div>Déclaration non trouvée</div>;
  }

  const renderRegulationInfo = () => {
    if (!declaration.regulationInfo) return null;

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-orange-600">
          <InfoIcon className="h-5 w-5" />
          <h2 className="text-lg font-medium">Réglementation</h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Current Regulation */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Réglementation Actuelle</h3>
            <h4 className="text-base font-medium">{declaration.regulationInfo.currentRegulation.title}</h4>
            <p className="text-gray-600">{declaration.regulationInfo.currentRegulation.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>En vigueur depuis le {declaration.regulationInfo.currentRegulation.effectiveDate}</span>
            </div>
            {declaration.regulationInfo.currentRegulation.source && (
              <p className="text-sm text-gray-500">
                Source: {declaration.regulationInfo.currentRegulation.source}
              </p>
            )}
          </div>

          {/* Upcoming Regulation */}
          {declaration.regulationInfo.upcomingRegulation && (
            <div className="space-y-2 bg-orange-50/50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Évolution de la Réglementation</h3>
                <span className="text-sm text-orange-600">
                  (À partir du {declaration.regulationInfo.upcomingRegulation.effectiveDate})
                </span>
              </div>
              <h4 className="text-base font-medium">{declaration.regulationInfo.upcomingRegulation.title}</h4>
              <p className="text-gray-600">{declaration.regulationInfo.upcomingRegulation.description}</p>

              {declaration.regulationInfo.upcomingRegulation.changes && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Principaux changements:</h4>
                  <ul className="space-y-2 text-gray-600">
                    {declaration.regulationInfo.upcomingRegulation.changes.map((change, index) => (
                      <li key={index} className="flex gap-2">
                        <span>•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {declaration.regulationInfo.upcomingRegulation.source && (
                <p className="text-sm text-gray-500">
                  Source: {declaration.regulationInfo.upcomingRegulation.source}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Back Button */}
      <Link
        to="/dashboard"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Retour aux déclarations
      </Link>

      {/* Title Section */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{declaration.title}</h1>
          {declaration.isRegulated && (
            <span className="inline-flex px-3 py-1 rounded-full text-orange-600 bg-orange-100/80 text-sm">
              Réglementation évolutive
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-600">{declaration.description}</p>
      </div>

      {declaration.isRegulated ? (
        <Tabs defaultValue="apercu" className="w-full">
          <TabsList className="w-full border-b">
            <TabsTrigger value="apercu" className="px-8">Aperçu</TabsTrigger>
            <TabsTrigger value="evolutions" className="px-8">Évolutions</TabsTrigger>
          </TabsList>
          <TabsContent value="apercu" className="mt-6">
            <div className="space-y-6">
              <FormLayout
                progress={declaration.progress}
                capturedInfo={declaration.capturedInfo}
                pendingInfo={declaration.pendingInfo}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Plan de Résolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {declaration.resolutionSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{step.title}</h4>
                          <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>Échéance: {step.dueDate}</span>
                            </div>
                            {step.priority === 'Urgent' && (
                              <div className="flex items-center gap-1 text-sm text-red-600">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Urgent</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="evolutions" className="mt-6">
            {renderRegulationInfo()}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <FormLayout
            progress={declaration.progress}
            capturedInfo={declaration.capturedInfo}
            pendingInfo={declaration.pendingInfo}
          />
          <Card>
            <CardHeader>
              <CardTitle>Plan de Résolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {declaration.resolutionSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Échéance: {step.dueDate}</span>
                        </div>
                        {step.priority === 'Urgent' && (
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Urgent</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
