import { CalendarClock, FileText, Plant, Droplets, Leaf, Factory, Euro, Building2, Users } from 'lucide-react';

export const deadlines = {
  'declaration-agricole': {
    id: 'declaration-agricole',
    title: 'Déclaration d\'Activité Agricole',
    deadlines: [
      {
        id: 1,
        title: 'Déclaration annuelle',
        date: '2024-03-15',
        status: 'upcoming',
        description: 'Déclaration principale des activités agricoles de l\'année'
      },
      {
        id: 2,
        title: 'Mise à jour semestrielle',
        date: '2024-09-15',
        status: 'planned',
        description: 'Actualisation des données d\'exploitation'
      }
    ]
  },
  'foncier': {
    id: 'foncier',
    title: 'Foncier Rural',
    deadlines: [
      {
        id: 1,
        title: 'Déclaration des modifications',
        date: '2024-02-28',
        status: 'upcoming',
        description: 'Changements dans la structure foncière'
      },
      {
        id: 2,
        title: 'Révision cadastrale',
        date: '2024-06-30',
        status: 'planned',
        description: 'Mise à jour des données cadastrales'
      }
    ]
  },
  'engrais': {
    id: 'engrais',
    title: 'Gestion des Engrais',
    deadlines: [
      {
        id: 1,
        title: 'Plan de fumure prévisionnel',
        date: '2024-02-15',
        status: 'upcoming',
        description: 'Planification de la fertilisation'
      },
      {
        id: 2,
        title: 'Cahier d\'épandage',
        date: '2024-12-31',
        status: 'planned',
        description: 'Bilan des pratiques de fertilisation'
      }
    ]
  },
  'phyto': {
    id: 'phyto',
    title: 'Produits Phytosanitaires',
    deadlines: [
      {
        id: 1,
        title: 'Registre phytosanitaire',
        date: '2024-01-31',
        status: 'urgent',
        description: 'Bilan annuel des traitements'
      },
      {
        id: 2,
        title: 'Contrôle pulvérisateur',
        date: '2024-07-15',
        status: 'planned',
        description: 'Vérification du matériel de traitement'
      }
    ]
  },
  'efa': {
    id: 'efa',
    title: 'Zones EFA',
    deadlines: [
      {
        id: 1,
        title: 'Déclaration surfaces EFA',
        date: '2024-05-15',
        status: 'upcoming',
        description: 'Surfaces d\'intérêt écologique'
      },
      {
        id: 2,
        title: 'Validation terrain',
        date: '2024-06-30',
        status: 'planned',
        description: 'Contrôle sur place des EFA'
      }
    ]
  },
  'eau': {
    id: 'eau',
    title: 'Eau Agricole',
    deadlines: [
      {
        id: 1,
        title: 'Relevé compteurs',
        date: '2024-01-05',
        status: 'urgent',
        description: 'Déclaration des consommations'
      },
      {
        id: 2,
        title: 'Plan d\'irrigation',
        date: '2024-04-30',
        status: 'planned',
        description: 'Planification des besoins en eau'
      }
    ]
  },
  'carbone': {
    id: 'carbone',
    title: 'Bilan Carbone',
    deadlines: [
      {
        id: 1,
        title: 'Bilan GES annuel',
        date: '2024-03-31',
        status: 'upcoming',
        description: 'Calcul des émissions annuelles'
      },
      {
        id: 2,
        title: 'Plan de réduction',
        date: '2024-04-30',
        status: 'planned',
        description: 'Objectifs de réduction carbone'
      }
    ]
  },
  'sante-securite': {
    id: 'sante-securite',
    title: 'Santé et Sécurité',
    deadlines: [
      {
        id: 1,
        title: 'Document unique',
        date: '2024-01-31',
        status: 'urgent',
        description: 'Mise à jour évaluation des risques'
      },
      {
        id: 2,
        title: 'Formation sécurité',
        date: '2024-06-15',
        status: 'planned',
        description: 'Formation annuelle obligatoire'
      }
    ]
  },
  'pac': {
    id: 'pac',
    title: 'PAC',
    deadlines: [
      {
        id: 1,
        title: 'Déclaration PAC',
        date: '2024-05-15',
        status: 'upcoming',
        description: 'Déclaration surfaces et aides'
      },
      {
        id: 2,
        title: 'Verdissement',
        date: '2024-09-15',
        status: 'planned',
        description: 'Justificatifs environnementaux'
      }
    ]
  },
  'animaux': {
    id: 'animaux',
    title: 'Identification Animaux',
    deadlines: [
      {
        id: 1,
        title: 'Recensement annuel',
        date: '2024-01-31',
        status: 'urgent',
        description: 'Inventaire du cheptel'
      },
      {
        id: 2,
        title: 'Registre sanitaire',
        date: '2024-12-31',
        status: 'planned',
        description: 'Suivi sanitaire annuel'
      }
    ]
  },
  'bien-etre': {
    id: 'bien-etre',
    title: 'Bien-être Animal',
    deadlines: [
      {
        id: 1,
        title: 'Audit bien-être',
        date: '2024-04-30',
        status: 'upcoming',
        description: 'Évaluation des conditions d\'élevage'
      },
      {
        id: 2,
        title: 'Formation bien-être',
        date: '2024-10-15',
        status: 'planned',
        description: 'Formation réglementaire'
      }
    ]
  },
  'cotisations': {
    id: 'cotisations',
    title: 'Cotisations MSA',
    deadlines: [
      {
        id: 1,
        title: 'Déclaration revenus',
        date: '2024-05-15',
        status: 'upcoming',
        description: 'Revenus professionnels N-1'
      },
      {
        id: 2,
        title: 'Régularisation',
        date: '2024-12-31',
        status: 'planned',
        description: 'Ajustement des cotisations'
      }
    ]
  },
  'tva': {
    id: 'tva',
    title: 'TVA Agricole',
    deadlines: [
      {
        id: 1,
        title: 'Déclaration TVA T1',
        date: '2024-04-30',
        status: 'upcoming',
        description: 'Premier trimestre 2024'
      },
      {
        id: 2,
        title: 'Régularisation annuelle',
        date: '2024-12-31',
        status: 'planned',
        description: 'Bilan TVA année 2024'
      }
    ]
  }
};
