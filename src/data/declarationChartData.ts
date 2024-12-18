// Mock data for different types of declarations
export const chartData = {
  'phytosanitaires': {
    compliance: [
      { name: 'Conforme', value: 80 },
      { name: 'En cours', value: 15 },
      { name: 'Non conforme', value: 5 }
    ],
    usage: [
      { month: 'Jan', value: 30 },
      { month: 'Fév', value: 35 },
      { month: 'Mar', value: 45 },
      { month: 'Avr', value: 80 },
      { month: 'Mai', value: 95 },
      { month: 'Juin', value: 60 },
      { month: 'Juil', value: 45 },
      { month: 'Août', value: 40 },
      { month: 'Sept', value: 45 },
      { month: 'Oct', value: 50 },
      { month: 'Nov', value: 40 },
      { month: 'Déc', value: 35 }
    ],
    distribution: [
      { name: 'Herbicides', value: 40 },
      { name: 'Fongicides', value: 30 },
      { name: 'Insecticides', value: 20 },
      { name: 'Autres', value: 10 }
    ]
  },
  'conformite-sante-securite': {
    compliance: [
      { name: 'Conforme', value: 85 },
      { name: 'En cours', value: 10 },
      { name: 'Non conforme', value: 5 }
    ],
    incidents: [
      { month: 'Jan', value: 2 },
      { month: 'Fév', value: 1 },
      { month: 'Mar', value: 3 },
      { month: 'Avr', value: 2 },
      { month: 'Mai', value: 1 },
      { month: 'Juin', value: 0 },
      { month: 'Juil', value: 2 },
      { month: 'Août', value: 1 },
      { month: 'Sept', value: 2 },
      { month: 'Oct', value: 1 },
      { month: 'Nov', value: 2 },
      { month: 'Déc', value: 1 }
    ],
    riskAreas: [
      { name: 'Équipement', value: 35 },
      { name: 'Formation', value: 25 },
      { name: 'Procédures', value: 20 },
      { name: 'Infrastructure', value: 20 }
    ]
  },
  'engrais-sols': {
    compliance: [
      { name: 'Optimal', value: 70 },
      { name: 'Acceptable', value: 20 },
      { name: 'À améliorer', value: 10 }
    ],
    usage: [
      { month: 'Jan', value: 20 },
      { month: 'Fév', value: 25 },
      { month: 'Mar', value: 40 },
      { month: 'Avr', value: 60 },
      { month: 'Mai', value: 80 },
      { month: 'Juin', value: 70 },
      { month: 'Juil', value: 50 },
      { month: 'Août', value: 40 },
      { month: 'Sept', value: 45 },
      { month: 'Oct', value: 35 },
      { month: 'Nov', value: 30 },
      { month: 'Déc', value: 25 }
    ],
    distribution: [
      { name: 'Azotés', value: 40 },
      { name: 'Phosphatés', value: 30 },
      { name: 'Potassiques', value: 20 },
      { name: 'Organiques', value: 10 }
    ]
  },
  'efa': {
    compliance: [
      { name: 'Conforme', value: 90 },
      { name: 'En ajustement', value: 8 },
      { name: 'Non conforme', value: 2 }
    ],
    usage: [
      { month: 'Jan', value: 100 },
      { month: 'Fév', value: 100 },
      { month: 'Mar', value: 100 },
      { month: 'Avr', value: 95 },
      { month: 'Mai', value: 95 },
      { month: 'Juin', value: 95 },
      { month: 'Juil', value: 90 },
      { month: 'Août', value: 90 },
      { month: 'Sept', value: 90 },
      { month: 'Oct', value: 100 },
      { month: 'Nov', value: 100 },
      { month: 'Déc', value: 100 }
    ],
    distribution: [
      { name: 'Haies', value: 35 },
      { name: 'Jachères', value: 25 },
      { name: 'Bandes tampons', value: 20 },
      { name: 'Arbres isolés', value: 20 }
    ]
  },
  'eau': {
    compliance: [
      { name: 'Optimal', value: 75 },
      { name: 'Acceptable', value: 20 },
      { name: 'Critique', value: 5 }
    ],
    usage: [
      { month: 'Jan', value: 30 },
      { month: 'Fév', value: 35 },
      { month: 'Mar', value: 40 },
      { month: 'Avr', value: 50 },
      { month: 'Mai', value: 70 },
      { month: 'Juin', value: 90 },
      { month: 'Juil', value: 100 },
      { month: 'Août', value: 95 },
      { month: 'Sept', value: 70 },
      { month: 'Oct', value: 50 },
      { month: 'Nov', value: 40 },
      { month: 'Déc', value: 35 }
    ],
    distribution: [
      { name: 'Irrigation', value: 60 },
      { name: 'Élevage', value: 25 },
      { name: 'Nettoyage', value: 10 },
      { name: 'Autres', value: 5 }
    ]
  },
  'carbone': {
    compliance: [
      { name: 'Objectif atteint', value: 65 },
      { name: 'En progression', value: 25 },
      { name: 'À améliorer', value: 10 }
    ],
    usage: [
      { month: 'Jan', value: 85 },
      { month: 'Fév', value: 82 },
      { month: 'Mar', value: 80 },
      { month: 'Avr', value: 78 },
      { month: 'Mai', value: 75 },
      { month: 'Juin', value: 73 },
      { month: 'Juil', value: 70 },
      { month: 'Août', value: 72 },
      { month: 'Sept', value: 75 },
      { month: 'Oct', value: 78 },
      { month: 'Nov', value: 80 },
      { month: 'Déc', value: 82 }
    ],
    distribution: [
      { name: 'Machines', value: 40 },
      { name: 'Élevage', value: 30 },
      { name: 'Transport', value: 20 },
      { name: 'Bâtiments', value: 10 }
    ]
  },
  'pac': {
    compliance: [
      { name: 'Validé', value: 80 },
      { name: 'En révision', value: 15 },
      { name: 'En attente', value: 5 }
    ],
    usage: [
      { month: 'Jan', value: 10 },
      { month: 'Fév', value: 15 },
      { month: 'Mar', value: 25 },
      { month: 'Avr', value: 60 },
      { month: 'Mai', value: 100 },
      { month: 'Juin', value: 40 },
      { month: 'Juil', value: 20 },
      { month: 'Août', value: 15 },
      { month: 'Sept', value: 10 },
      { month: 'Oct', value: 15 },
      { month: 'Nov', value: 20 },
      { month: 'Déc', value: 10 }
    ],
    distribution: [
      { name: 'Paiement de base', value: 45 },
      { name: 'Paiement vert', value: 30 },
      { name: 'Aide couplée', value: 15 },
      { name: 'Autres', value: 10 }
    ]
  },
  'identification-animaux': {
    compliance: [
      { name: 'À jour', value: 95 },
      { name: 'En cours', value: 4 },
      { name: 'En retard', value: 1 }
    ],
    usage: [
      { month: 'Jan', value: 50 },
      { month: 'Fév', value: 55 },
      { month: 'Mar', value: 60 },
      { month: 'Avr', value: 65 },
      { month: 'Mai', value: 70 },
      { month: 'Juin', value: 75 },
      { month: 'Juil', value: 80 },
      { month: 'Août', value: 75 },
      { month: 'Sept', value: 70 },
      { month: 'Oct', value: 65 },
      { month: 'Nov', value: 60 },
      { month: 'Déc', value: 55 }
    ],
    distribution: [
      { name: 'Bovins', value: 50 },
      { name: 'Ovins', value: 25 },
      { name: 'Caprins', value: 15 },
      { name: 'Autres', value: 10 }
    ]
  },
  'bien-etre': {
    compliance: [
      { name: 'Excellent', value: 70 },
      { name: 'Satisfaisant', value: 25 },
      { name: 'À améliorer', value: 5 }
    ],
    usage: [
      { month: 'Jan', value: 85 },
      { month: 'Fév', value: 86 },
      { month: 'Mar', value: 88 },
      { month: 'Avr', value: 90 },
      { month: 'Mai', value: 92 },
      { month: 'Juin', value: 90 },
      { month: 'Juil', value: 88 },
      { month: 'Août', value: 89 },
      { month: 'Sept', value: 91 },
      { month: 'Oct', value: 90 },
      { month: 'Nov', value: 88 },
      { month: 'Déc', value: 87 }
    ],
    distribution: [
      { name: 'Logement', value: 35 },
      { name: 'Alimentation', value: 30 },
      { name: 'Santé', value: 25 },
      { name: 'Comportement', value: 10 }
    ]
  },
  'cotisation': {
    compliance: [
      { name: 'À jour', value: 90 },
      { name: 'En cours', value: 8 },
      { name: 'Retard', value: 2 }
    ],
    usage: [
      { month: 'Jan', value: 100 },
      { month: 'Fév', value: 95 },
      { month: 'Mar', value: 90 },
      { month: 'Avr', value: 100 },
      { month: 'Mai', value: 95 },
      { month: 'Juin', value: 90 },
      { month: 'Juil', value: 100 },
      { month: 'Août', value: 95 },
      { month: 'Sept', value: 90 },
      { month: 'Oct', value: 100 },
      { month: 'Nov', value: 95 },
      { month: 'Déc', value: 90 }
    ],
    distribution: [
      { name: 'Salariés permanents', value: 60 },
      { name: 'Saisonniers', value: 25 },
      { name: 'Apprentis', value: 10 },
      { name: 'Autres', value: 5 }
    ]
  },
  'tva': {
    compliance: [
      { name: 'Déclaré', value: 85 },
      { name: 'En préparation', value: 12 },
      { name: 'Retard', value: 3 }
    ],
    usage: [
      { month: 'Jan', value: 90 },
      { month: 'Fév', value: 85 },
      { month: 'Mar', value: 100 },
      { month: 'Avr', value: 90 },
      { month: 'Mai', value: 85 },
      { month: 'Juin', value: 100 },
      { month: 'Juil', value: 90 },
      { month: 'Août', value: 85 },
      { month: 'Sept', value: 100 },
      { month: 'Oct', value: 90 },
      { month: 'Nov', value: 85 },
      { month: 'Déc', value: 100 }
    ],
    distribution: [
      { name: 'Ventes', value: 55 },
      { name: 'Achats', value: 35 },
      { name: 'Investissements', value: 8 },
      { name: 'Services', value: 2 }
    ]
  },
  'declaration-activite': {
    compliance: [
      { name: 'Conforme', value: 75 },
      { name: 'En cours', value: 20 },
      { name: 'Non conforme', value: 5 }
    ],
    usage: [
      { month: 'Jan', value: 40 },
      { month: 'Fév', value: 45 },
      { month: 'Mar', value: 50 },
      { month: 'Avr', value: 55 },
      { month: 'Mai', value: 60 },
      { month: 'Juin', value: 65 },
      { month: 'Juil', value: 70 },
      { month: 'Août', value: 75 },
      { month: 'Sept', value: 80 },
      { month: 'Oct', value: 85 },
      { month: 'Nov', value: 90 },
      { month: 'Déc', value: 95 }
    ],
    distribution: [
      { name: 'Cultures', value: 45 },
      { name: 'Élevage', value: 30 },
      { name: 'Viticulture', value: 15 },
      { name: 'Autres', value: 10 }
    ]
  },
  'foncier-rural': {
    compliance: [
      { name: 'Conforme', value: 90 },
      { name: 'En cours', value: 8 },
      { name: 'Non conforme', value: 2 }
    ],
    usage: [
      { month: 'Jan', value: 85 },
      { month: 'Fév', value: 85 },
      { month: 'Mar', value: 88 },
      { month: 'Avr', value: 90 },
      { month: 'Mai', value: 92 },
      { month: 'Juin', value: 92 },
      { month: 'Juil', value: 95 },
      { month: 'Août', value: 95 },
      { month: 'Sept', value: 95 },
      { month: 'Oct', value: 93 },
      { month: 'Nov', value: 92 },
      { month: 'Déc', value: 90 }
    ],
    distribution: [
      { name: 'Terres arables', value: 50 },
      { name: 'Pâturages', value: 30 },
      { name: 'Forêts', value: 15 },
      { name: 'Bâtiments', value: 5 }
    ]
  }
};

// Default chart data for any declaration type
export const defaultChartData = {
  compliance: [
    { name: 'Conforme', value: 75 },
    { name: 'En cours', value: 20 },
    { name: 'Non conforme', value: 5 }
  ],
  monthly: [
    { name: 'Jan', value: 30 },
    { name: 'Fév', value: 35 },
    { name: 'Mar', value: 40 },
    { name: 'Avr', value: 45 },
    { name: 'Mai', value: 50 },
    { name: 'Juin', value: 55 },
    { name: 'Juil', value: 60 },
    { name: 'Août', value: 65 },
    { name: 'Sept', value: 70 },
    { name: 'Oct', value: 75 },
    { name: 'Nov', value: 80 },
    { name: 'Déc', value: 85 }
  ],
  distribution: [
    { name: 'Type A', value: 35 },
    { name: 'Type B', value: 25 },
    { name: 'Type C', value: 20 },
    { name: 'Type D', value: 20 }
  ]
};

// Public Declarations Chart Data
export const publicDeclarationCharts = {
  submissionStatus: [
    { name: 'Soumises', value: 75 },
    { name: 'En cours', value: 15 },
    { name: 'À commencer', value: 10 }
  ],
  monthlySubmissions: [
    { month: 'Jan', count: 12 },
    { month: 'Fév', count: 15 },
    { month: 'Mar', count: 8 },
    { month: 'Avr', count: 10 },
    { month: 'Mai', count: 14 },
    { month: 'Juin', count: 18 },
    { month: 'Juil', count: 16 },
    { month: 'Août', count: 9 },
    { month: 'Sept', count: 11 },
    { month: 'Oct', count: 13 },
    { month: 'Nov', count: 17 },
    { month: 'Déc', count: 20 }
  ],
  declarationTypes: [
    { type: 'PAC', count: 35 },
    { type: 'Environnement', count: 25 },
    { type: 'Sanitaire', count: 20 },
    { type: 'Social', count: 15 },
    { type: 'Autre', count: 5 }
  ]
};
