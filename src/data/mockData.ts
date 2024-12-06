import { CategoryWithForms } from '../types/dashboard';

export const categories: CategoryWithForms[] = [
  {
    id: 'general-registration',
    title: 'Déclarations Générales',
    completion: 40,
    description: 'Documents essentiels pour vos opérations agricoles',
    forms: [
      {
        id: 'label-rouge',
        title: 'Label Rouge',
        completion: 65,
        categoryId: 'general-registration',
        description: 'Certification Label Rouge',
        dueDate: '2024-06-30',
        capturedFields: {
          'SIRET': '12345678901234',
          'Date d\'enregistrement': '15/01/2024',
          'Type d\'activité': 'Culture de céréales',
          'Adresse d\'exploitation': '123 Route des Champs, 31000 Toulouse'
        },
        pendingFields: [
          'Cahier des charges Label Rouge',
          'Audit de certification', 
          'Contrôles qualité'
        ]
      },
      {
        id: 'declaration-activite',
        title: 'Déclaration d\'Activité Agricole',
        completion: 80,
        categoryId: 'general-registration',
        description: 'Enregistrement annuel de l\'activité agricole',
        dueDate: '2024-12-31',
        capturedFields: {
          'SIRET': '12345678901234',
          'Date d\'enregistrement': '15/01/2024',
          'Code APE/NAF': '0111Z',
          'Type d\'activité': 'Culture de céréales',
          'Adresse d\'exploitation': '123 Route des Champs, 31000 Toulouse'
        },
        pendingFields: [
          'Attestation MSA à jour',
          'Certification Bio (si applicable)',
          'Déclaration des surfaces cultivées'
        ]
      },
      {
        id: 'cotisation-agricole',
        title: 'Cotisation Agricole MSA',
        completion: 0,
        categoryId: 'general-registration',
        description: 'Déclaration sociale pour les travailleurs agricoles',
        dueDate: '2024-06-30',
        pendingFields: [
          'Déclaration des revenus agricoles',
          'Liste des salariés',
          'Attestation d\'assurance obligatoire',
          'Bordereau de cotisation'
        ]
      },
      {
        id: 'tva-agricole',
        title: 'Déclaration de TVA Agricole',
        completion: 25,
        categoryId: 'general-registration',
        description: 'Déclaration trimestrielle de TVA',
        dueDate: '2024-04-30'
      }
    ]
  },
  {
    id: 'subsidies',
    title: 'Aides et Subventions PAC',
    completion: 62,
    description: 'Gestion des aides de la Politique Agricole Commune',
    forms: [
      {
        id: 'pac',
        title: 'Régime de Paiement de Base (RPB)',
        completion: 50,
        categoryId: 'subsidies',
        description: 'Demande principale des aides PAC',
        dueDate: '2024-05-15',
        capturedFields: {
          'Numéro Pacage': '031234567',
          'Surface Agricole Utile': '85 hectares',
          'Cultures principales': 'Blé tendre, Maïs, Tournesol',
          'DPB activés': '85 droits'
        },
        pendingFields: [
          'Déclaration surfaces d\'intérêt écologique',
          'Photos géolocalisées des parcelles',
          'Justificatifs de propriété/fermage'
        ]
      },
      {
        id: 'ichn',
        title: 'ICHN - Indemnité Compensatoire de Handicaps Naturels',
        completion: 75,
        categoryId: 'subsidies',
        description: 'Aide pour zones défavorisées',
        dueDate: '2024-07-31'
      },
      {
        id: 'maec',
        title: 'MAEC - Mesures Agro-Environnementales',
        completion: 30,
        categoryId: 'subsidies',
        description: 'Aides pour pratiques environnementales',
        dueDate: '2024-05-15'
      }
    ]
  },
  {
    id: 'environmental',
    title: 'Déclarations Environnementales',
    completion: 37,
    description: 'Conformité environnementale et développement durable',
    forms: [
      {
        id: 'efa',
        title: 'Zones de Focus Écologiques (EFA)',
        completion: 30,
        categoryId: 'environmental',
        description: 'Déclaration des surfaces d\'intérêt écologique',
        dueDate: '2024-09-30',
        capturedFields: {
          'Surface totale': '85 hectares',
          'Haies déclarées': '2.5 km',
          'Jachères mellifères': '3 hectares'
        },
        pendingFields: [
          'Cartographie des éléments topographiques',
          'Plan de gestion des haies',
          'Registre phytosanitaire zones EFA'
        ]
      },
      {
        id: 'eau-agricole',
        title: 'Déclaration d\'Eau Agricole',
        completion: 45,
        categoryId: 'environmental',
        description: 'Suivi de la consommation d\'eau',
        dueDate: '2024-04-15'
      },
      {
        id: 'phyto',
        title: 'Registre Phytosanitaire',
        completion: 20,
        categoryId: 'environmental',
        description: 'Suivi des traitements phytosanitaires',
        dueDate: '2024-12-31'
      }
    ]
  },
  {
    id: 'livestock',
    title: 'Élevage et Bien-être Animal',
    completion: 55,
    description: 'Gestion et suivi du cheptel',
    forms: [
      {
        id: 'identification',
        title: 'Identification des Animaux',
        completion: 70,
        categoryId: 'livestock',
        description: 'Registre d\'identification du bétail',
        dueDate: '2024-03-31'
      },
      {
        id: 'sante-animale',
        title: 'Registre Sanitaire',
        completion: 40,
        categoryId: 'livestock',
        description: 'Suivi vétérinaire et traitements',
        dueDate: '2024-06-30'
      }
    ]
  }
];