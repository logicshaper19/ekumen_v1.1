import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Share2, BookmarkPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface RiskOpportunityData {
  id: string;
  type: 'risk' | 'opportunity';
  title: string;
  stakeholder: string;
  description: string;
  impact: {
    withAction: string;
    withoutAction: string;
  };
  evolution: {
    date: string;
    value: number;
    probability: number;
  }[];
  recommendations: string[];
  ctaLink?: string;
}

const data: { [key: string]: RiskOpportunityData } = {
  'maelab-risk-soil': {
    id: 'maelab-risk-soil',
    type: 'risk',
    title: 'Dégradation des Sols',
    stakeholder: 'Exploitation',
    description: 'Perte de fertilité des sols due aux pratiques intensives',
    impact: {
      withAction: '+5% rendement/an\n• Amélioration structure du sol\n• Réduction des intrants\n• Biodiversité enrichie',
      withoutAction: '-15% rendement/an\n• Erosion continue\n• Coûts croissants des intrants\n• Perte de biodiversité'
    },
    recommendations: [
      'Mettre en place une rotation des cultures plus diversifiée',
      'Réduire le travail du sol',
      'Implanter des couverts végétaux'
    ],
    evolution: [
      { date: '2024', value: 7, probability: 75 },
      { date: '2025', value: 6.5, probability: 70 },
      { date: '2026', value: 6, probability: 65 },
      { date: '2027', value: 5.5, probability: 62 },
      { date: '2028', value: 5, probability: 60 },
      { date: '2029', value: 4.5, probability: 58 },
      { date: '2030', value: 4, probability: 55 },
      { date: '2031', value: 3.5, probability: 52 },
      { date: '2032', value: 3, probability: 50 },
      { date: '2033', value: 2.5, probability: 48 }
    ],
    ctaLink: 'https://agriculture.gouv.fr/sols'
  },
  'insurance-risk-coverage': {
    id: 'insurance-risk-coverage',
    type: 'risk',
    title: 'Changement climatique',
    stakeholder: 'Environnement',
    description: 'Impact des conditions météorologiques extrêmes sur les cultures',
    impact: {
      withAction: '-30% pertes climatiques\n• Résilience accrue\n• Protection contre les aléas\n• Couverture assurantielle',
      withoutAction: '+50% pertes potentielles\n• Vulnérabilité aux événements\n• Dommages aux cultures\n• Risques non couverts'
    },
    recommendations: [
      'Diversifier les cultures',
      'Installer des systèmes d\'irrigation efficaces',
      'Souscrire à une assurance climatique'
    ],
    evolution: [
      { date: '2024', value: 7, probability: 70 },
      { date: '2025', value: 6.5, probability: 65 },
      { date: '2026', value: 6, probability: 60 },
      { date: '2027', value: 5.5, probability: 55 },
      { date: '2028', value: 5, probability: 50 },
      { date: '2029', value: 4.5, probability: 45 },
      { date: '2030', value: 4, probability: 40 },
      { date: '2031', value: 3.5, probability: 35 },
      { date: '2032', value: 3, probability: 30 },
      { date: '2033', value: 2.5, probability: 25 }
    ],
    ctaLink: 'https://www.groupama.fr/assurances-agricoles'
  },
  'ca-risk-debt': {
    id: 'ca-risk-debt',
    type: 'risk',
    title: 'Volatilité des prix',
    stakeholder: 'Marché',
    description: 'Fluctuations importantes des prix des produits agricoles',
    impact: {
      withAction: '+20% stabilité des revenus\n• Prix garantis\n• Trésorerie sécurisée\n• Investissements possibles',
      withoutAction: '-25% revenus potentiels\n• Prix volatils\n• Trésorerie instable\n• Difficultés d\'investissement'
    },
    recommendations: [
      'Diversifier les cultures',
      'Établir des contrats à terme',
      'Constituer une réserve financière'
    ],
    evolution: [
      { date: '2024', value: 6, probability: 65 },
      { date: '2025', value: 5.5, probability: 60 },
      { date: '2026', value: 5, probability: 55 },
      { date: '2027', value: 4.5, probability: 50 },
      { date: '2028', value: 4, probability: 45 },
      { date: '2029', value: 3.5, probability: 40 },
      { date: '2030', value: 3, probability: 35 },
      { date: '2031', value: 2.5, probability: 30 },
      { date: '2032', value: 2, probability: 25 },
      { date: '2033', value: 1.5, probability: 20 }
    ],
    ctaLink: 'https://www.credit-agricole.fr/professionnel/financer-projets'
  },
  'maelab-opp-innovation': {
    id: 'maelab-opp-innovation',
    type: 'opportunity',
    title: 'Marché bio',
    stakeholder: 'Marché',
    description: 'Forte croissance du marché des produits biologiques',
    impact: {
      withAction: '+30% augmentation des ventes\n• Diversification des produits\n• Meilleure valorisation\n• Développement durable',
      withoutAction: '+10% augmentation des ventes\n• Concurrence accrue\n• Prix instables\n• Risques de déclassement'
    },
    recommendations: [
      'Planifier la conversion bio',
      'Développer des partenariats locaux',
      'Former les équipes aux pratiques bio'
    ],
    evolution: [
      { date: '2024', value: 3, probability: 40 },
      { date: '2025', value: 3.5, probability: 45 },
      { date: '2026', value: 4, probability: 50 },
      { date: '2027', value: 4.5, probability: 55 },
      { date: '2028', value: 5, probability: 60 },
      { date: '2029', value: 5.5, probability: 65 },
      { date: '2030', value: 6, probability: 70 },
      { date: '2031', value: 6.5, probability: 75 },
      { date: '2032', value: 7, probability: 80 },
      { date: '2033', value: 7.5, probability: 85 }
    ],
    ctaLink: 'https://www.agencebio.org'
  },
  'chamber-opp-tech': {
    id: 'chamber-opp-tech',
    type: 'opportunity',
    title: 'Nouvelles technologies',
    stakeholder: 'Innovation',
    description: 'Opportunités d\'amélioration via l\'agriculture de précision',
    impact: {
      withAction: '+25% augmentation de la productivité\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% augmentation de la productivité\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Investir dans des outils connectés',
      'Former les équipes aux nouvelles technologies',
      'Participer à des projets pilotes'
    ],
    evolution: [
      { date: '2024', value: 2, probability: 30 },
      { date: '2025', value: 2.5, probability: 35 },
      { date: '2026', value: 3, probability: 40 },
      { date: '2027', value: 3.5, probability: 45 },
      { date: '2028', value: 4, probability: 50 },
      { date: '2029', value: 4.5, probability: 55 },
      { date: '2030', value: 5, probability: 60 },
      { date: '2031', value: 5.5, probability: 65 },
      { date: '2032', value: 6, probability: 70 },
      { date: '2033', value: 6.5, probability: 75 }
    ],
    ctaLink: 'https://chambres-agriculture.fr/innovations-agricoles'
  },
  'ca-opp-local': {
    id: 'ca-opp-local',
    type: 'opportunity',
    title: 'Circuit court',
    stakeholder: 'Distribution',
    description: 'Développement des circuits de distribution locaux',
    impact: {
      withAction: '+20% augmentation des ventes\n• Meilleure valorisation\n• Développement durable\n• Réduction des coûts',
      withoutAction: '+5% augmentation des ventes\n• Concurrence accrue\n• Prix instables\n• Risques de déclassement'
    },
    recommendations: [
      'Développer une stratégie de vente directe',
      'Créer des partenariats locaux',
      'Investir dans la transformation'
    ],
    evolution: [
      { date: '2024', value: 2.5, probability: 35 },
      { date: '2025', value: 3, probability: 40 },
      { date: '2026', value: 3.5, probability: 45 },
      { date: '2027', value: 4, probability: 50 },
      { date: '2028', value: 4.5, probability: 55 },
      { date: '2029', value: 5, probability: 60 },
      { date: '2030', value: 5.5, probability: 65 },
      { date: '2031', value: 6, probability: 70 },
      { date: '2032', value: 6.5, probability: 75 },
      { date: '2033', value: 7, probability: 80 }
    ],
    ctaLink: 'https://www.credit-agricole.fr/professionnel/agriculture/circuit-court'
  },
  'accountant-risk-cash': {
    id: 'accountant-risk-cash',
    type: 'risk',
    title: 'Trésorerie Tendue',
    stakeholder: 'Comptable',
    description: 'Difficultés de trésorerie saisonnières',
    impact: {
      withAction: '+15% amélioration de la trésorerie\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '-20% dégradation de la trésorerie\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Négocier des délais de paiement',
      'Mettre en place un prévisionnel de trésorerie',
      'Constituer une réserve de sécurité'
    ],
    evolution: [
      { date: '2024', value: 6, probability: 50 },
      { date: '2025', value: 5.5, probability: 55 },
      { date: '2026', value: 5, probability: 50 },
      { date: '2027', value: 4.5, probability: 45 },
      { date: '2028', value: 4, probability: 40 },
      { date: '2029', value: 3.5, probability: 35 },
      { date: '2030', value: 3, probability: 30 },
      { date: '2031', value: 2.5, probability: 25 },
      { date: '2032', value: 2, probability: 20 },
      { date: '2033', value: 1.5, probability: 15 }
    ],
    ctaLink: 'https://www.expert-comptable.fr/actualites/la-gestion-de-la-tresorerie/'
  },
  'chamber-risk-compliance': {
    id: 'chamber-risk-compliance',
    type: 'risk',
    title: 'Non-Conformité Réglementaire',
    stakeholder: 'Chambre d\'Agriculture',
    description: 'Non-respect des nouvelles normes environnementales',
    impact: {
      withAction: '+10% amélioration de la conformité\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '-15% dégradation de la conformité\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Suivre les formations réglementaires',
      'Réaliser des audits réguliers',
      'Anticiper les évolutions normatives'
    ],
    evolution: [
      { date: '2024', value: 4, probability: 40 },
      { date: '2025', value: 4.5, probability: 45 },
      { date: '2026', value: 5, probability: 50 },
      { date: '2027', value: 4.5, probability: 45 },
      { date: '2028', value: 4, probability: 40 },
      { date: '2029', value: 3.5, probability: 35 },
      { date: '2030', value: 3, probability: 30 },
      { date: '2031', value: 2.5, probability: 25 },
      { date: '2032', value: 2, probability: 20 },
      { date: '2033', value: 1.5, probability: 15 }
    ],
    ctaLink: 'https://www.chambre-agriculture.fr/actualites/la-reglementation-environnementale/'
  },
  'coop-risk-quality': {
    id: 'coop-risk-quality',
    type: 'risk',
    title: 'Qualité des Produits',
    stakeholder: 'Coopérative',
    description: 'Non-respect des standards de qualité',
    impact: {
      withAction: '+15% amélioration de la qualité\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '-20% dégradation de la qualité\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Former les équipes aux bonnes pratiques',
      'Mettre en place des contrôles qualité',
      'Investir dans du matériel adapté'
    ],
    evolution: [
      { date: '2024', value: 5, probability: 30 },
      { date: '2025', value: 4.5, probability: 35 },
      { date: '2026', value: 4, probability: 30 },
      { date: '2027', value: 3.5, probability: 25 },
      { date: '2028', value: 3, probability: 20 },
      { date: '2029', value: 2.5, probability: 15 },
      { date: '2030', value: 2, probability: 10 },
      { date: '2031', value: 1.5, probability: 5 },
      { date: '2032', value: 1, probability: 0 },
      { date: '2033', value: 0.5, probability: 0 }
    ],
    ctaLink: 'https://www.cooperative.fr/actualites/la-qualite-des-produits/'
  },
  'carrefour-risk-contract': {
    id: 'carrefour-risk-contract',
    type: 'risk',
    title: 'Exigences Contractuelles',
    stakeholder: 'Carrefour',
    description: 'Difficultés à respecter les cahiers des charges',
    impact: {
      withAction: '+10% amélioration de la conformité\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '-15% dégradation de la conformité\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Planifier la production en amont',
      'Communiquer régulièrement avec l\'acheteur',
      'Former les équipes aux exigences spécifiques'
    ],
    evolution: [
      { date: '2024', value: 6, probability: 20 },
      { date: '2025', value: 5.5, probability: 25 },
      { date: '2026', value: 5, probability: 20 },
      { date: '2027', value: 4.5, probability: 15 },
      { date: '2028', value: 4, probability: 10 },
      { date: '2029', value: 3.5, probability: 5 },
      { date: '2030', value: 3, probability: 0 },
      { date: '2031', value: 2.5, probability: 0 },
      { date: '2032', value: 2, probability: 0 },
      { date: '2033', value: 1.5, probability: 0 }
    ],
    ctaLink: 'https://www.carrefour.fr/actualites/les-exigences-contractuelles/'
  },
  'insurance-coverage': {
    id: 'insurance-coverage',
    type: 'risk',
    title: 'Couverture Inadaptée',
    stakeholder: 'Assurance',
    description: 'Risque de pertes non couvertes',
    impact: {
      withAction: '+10% amélioration de la couverture\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '-15% dégradation de la couverture\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Revoir les contrats annuellement',
      'Adapter les garanties aux risques réels',
      'Comparer les offres d\'assurance'
    ],
    evolution: [
      { date: '2024', value: 7, probability: 10 },
      { date: '2025', value: 6.5, probability: 15 },
      { date: '2026', value: 6, probability: 10 },
      { date: '2027', value: 5.5, probability: 5 },
      { date: '2028', value: 5, probability: 0 },
      { date: '2029', value: 4.5, probability: 0 },
      { date: '2030', value: 4, probability: 0 },
      { date: '2031', value: 3.5, probability: 0 },
      { date: '2032', value: 3, probability: 0 },
      { date: '2033', value: 2.5, probability: 0 }
    ],
    ctaLink: 'https://www.assurance.fr/actualites/la-couverture-inadaptee/'
  },
  'maelab-opp-precision': {
    id: 'maelab-opp-precision',
    type: 'opportunity',
    title: 'Agriculture de Précision',
    stakeholder: 'MaeLabs',
    description: 'Optimisation des pratiques avec les technologies',
    impact: {
      withAction: '+25% augmentation de la productivité\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% augmentation de la productivité\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Investir dans des capteurs',
      'Former les équipes',
      'Analyser les données collectées'
    ],
    evolution: [
      { date: '2024', value: 3, probability: 80 },
      { date: '2025', value: 3.5, probability: 85 },
      { date: '2026', value: 4, probability: 90 },
      { date: '2027', value: 4.5, probability: 95 },
      { date: '2028', value: 5, probability: 100 },
      { date: '2029', value: 5.5, probability: 100 },
      { date: '2030', value: 6, probability: 100 },
      { date: '2031', value: 6.5, probability: 100 },
      { date: '2032', value: 7, probability: 100 },
      { date: '2033', value: 7.5, probability: 100 }
    ],
    ctaLink: 'https://www.maelabs.com/actualites/agriculture-de-precision/'
  },
  'ca-opp-green': {
    id: 'ca-opp-green',
    type: 'opportunity',
    title: 'Financement Vert',
    stakeholder: 'Crédit Agricole',
    description: 'Accès à des prêts avantageux écologiques',
    impact: {
      withAction: '+20% augmentation des financements\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% augmentation des financements\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Identifier les projets éligibles',
      'Préparer les dossiers de financement',
      'Suivre les appels à projets'
    ],
    evolution: [
      { date: '2024', value: 4, probability: 70 },
      { date: '2025', value: 4.5, probability: 75 },
      { date: '2026', value: 5, probability: 80 },
      { date: '2027', value: 5.5, probability: 85 },
      { date: '2028', value: 6, probability: 90 },
      { date: '2029', value: 6.5, probability: 95 },
      { date: '2030', value: 7, probability: 100 },
      { date: '2031', value: 7.5, probability: 100 },
      { date: '2032', value: 8, probability: 100 },
      { date: '2033', value: 8.5, probability: 100 }
    ],
    ctaLink: 'https://www.credit-agricole.fr/particuliers/financer-un-projet-ecologique'
  },
  'accountant-opp-tax': {
    id: 'accountant-opp-tax',
    type: 'opportunity',
    title: 'Optimisation Fiscale',
    stakeholder: 'Comptable',
    description: 'Réduction d\'impôts via investissements',
    impact: {
      withAction: '+15% réduction des impôts\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% réduction des impôts\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Planifier les investissements',
      'Suivre les dispositifs fiscaux',
      'Conserver les justificatifs'
    ],
    evolution: [
      { date: '2024', value: 3, probability: 60 },
      { date: '2025', value: 3.5, probability: 65 },
      { date: '2026', value: 4, probability: 70 },
      { date: '2027', value: 4.5, probability: 75 },
      { date: '2028', value: 5, probability: 80 },
      { date: '2029', value: 5.5, probability: 85 },
      { date: '2030', value: 6, probability: 90 },
      { date: '2031', value: 6.5, probability: 95 },
      { date: '2032', value: 7, probability: 100 },
      { date: '2033', value: 7.5, probability: 100 }
    ],
    ctaLink: 'https://www.expert-comptable.fr/actualites/optimisation-fiscale/'
  },
  'chamber-opp-subsidy': {
    id: 'chamber-opp-subsidy',
    type: 'opportunity',
    title: 'Aides PAC',
    stakeholder: 'Chambre d\'Agriculture',
    description: 'Nouvelles subventions durables',
    impact: {
      withAction: '+20% augmentation des aides\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% augmentation des aides\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Suivre les évolutions de la PAC',
      'Adapter les pratiques aux critères',
      'Préparer les dossiers en avance'
    ],
    evolution: [
      { date: '2024', value: 4, probability: 50 },
      { date: '2025', value: 4.5, probability: 55 },
      { date: '2026', value: 5, probability: 60 },
      { date: '2027', value: 5.5, probability: 65 },
      { date: '2028', value: 6, probability: 70 },
      { date: '2029', value: 6.5, probability: 75 },
      { date: '2030', value: 7, probability: 80 },
      { date: '2031', value: 7.5, probability: 85 },
      { date: '2032', value: 8, probability: 90 },
      { date: '2033', value: 8.5, probability: 95 }
    ],
    ctaLink: 'https://www.chambre-agriculture.fr/actualites/aides-pac/'
  },
  'coop-opp-mutualisation': {
    id: 'coop-opp-mutualisation',
    type: 'opportunity',
    title: 'Mutualisation',
    stakeholder: 'Coopérative',
    description: 'Partage des ressources et équipements',
    impact: {
      withAction: '+15% réduction des coûts\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% réduction des coûts\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Identifier les besoins mutualisables',
      'Participer aux réunions coopératives',
      'Planifier les utilisations communes'
    ],
    evolution: [
      { date: '2024', value: 3, probability: 40 },
      { date: '2025', value: 3.5, probability: 45 },
      { date: '2026', value: 4, probability: 50 },
      { date: '2027', value: 4.5, probability: 55 },
      { date: '2028', value: 5, probability: 60 },
      { date: '2029', value: 5.5, probability: 65 },
      { date: '2030', value: 6, probability: 70 },
      { date: '2031', value: 6.5, probability: 75 },
      { date: '2032', value: 7, probability: 80 },
      { date: '2033', value: 7.5, probability: 85 }
    ],
    ctaLink: 'https://www.cooperative.fr/actualites/mutualisation/'
  },
  'carrefour-opp-bio': {
    id: 'carrefour-opp-bio',
    type: 'opportunity',
    title: 'Premium Bio',
    stakeholder: 'Carrefour',
    description: 'Valorisation via la filière bio',
    impact: {
      withAction: '+20% augmentation des ventes\n• Meilleure valorisation\n• Développement durable\n• Réduction des coûts',
      withoutAction: '+5% augmentation des ventes\n• Concurrence accrue\n• Prix instables\n• Risques de déclassement'
    },
    recommendations: [
      'Planifier la conversion bio',
      'Négocier les contrats long terme',
      'Suivre les cahiers des charges'
    ],
    evolution: [
      { date: '2024', value: 4, probability: 30 },
      { date: '2025', value: 4.5, probability: 35 },
      { date: '2026', value: 5, probability: 40 },
      { date: '2027', value: 5.5, probability: 45 },
      { date: '2028', value: 6, probability: 50 },
      { date: '2029', value: 6.5, probability: 55 },
      { date: '2030', value: 7, probability: 60 },
      { date: '2031', value: 7.5, probability: 65 },
      { date: '2032', value: 8, probability: 70 },
      { date: '2033', value: 8.5, probability: 75 }
    ],
    ctaLink: 'https://www.carrefour.fr/actualites/premium-bio/'
  },
  'insurance-opp-products': {
    id: 'insurance-opp-products',
    type: 'opportunity',
    title: 'Nouveaux Produits',
    stakeholder: 'Assurance',
    description: 'Solutions innovantes climatiques',
    impact: {
      withAction: '+15% augmentation des ventes\n• Meilleure valorisation\n• Développement durable\n• Réduction des coûts',
      withoutAction: '+5% augmentation des ventes\n• Concurrence accrue\n• Prix instables\n• Risques de déclassement'
    },
    recommendations: [
      'Évaluer les nouvelles offres',
      'Tester les produits pilotes',
      'Partager le retour d\'expérience'
    ],
    evolution: [
      { date: '2024', value: 3, probability: 20 },
      { date: '2025', value: 3.5, probability: 25 },
      { date: '2026', value: 4, probability: 30 },
      { date: '2027', value: 4.5, probability: 35 },
      { date: '2028', value: 5, probability: 40 },
      { date: '2029', value: 5.5, probability: 45 },
      { date: '2030', value: 6, probability: 50 },
      { date: '2031', value: 6.5, probability: 55 },
      { date: '2032', value: 7, probability: 60 },
      { date: '2033', value: 7.5, probability: 65 }
    ],
    ctaLink: 'https://www.assurance.fr/actualites/nouveaux-produits/'
  },
  'market-opp-bio': {
    id: 'market-opp-bio',
    type: 'opportunity',
    title: 'Marché Bio',
    stakeholder: 'Consommateurs',
    description: 'Forte demande croissante pour les produits biologiques',
    impact: {
      withAction: '+25% augmentation des ventes\n• Meilleure valorisation\n• Développement durable\n• Réduction des coûts',
      withoutAction: '+5% augmentation des ventes\n• Concurrence accrue\n• Prix instables\n• Risques de déclassement'
    },
    recommendations: [
      'Étudier les certifications bio',
      'Planifier la conversion progressive',
      'Identifier les circuits de distribution'
    ],
    evolution: [
      { date: '2024', value: 5, probability: 60 },
      { date: '2025', value: 5.5, probability: 65 },
      { date: '2026', value: 6, probability: 70 },
      { date: '2027', value: 6.5, probability: 75 },
      { date: '2028', value: 7, probability: 80 },
      { date: '2029', value: 7.5, probability: 85 },
      { date: '2030', value: 8, probability: 90 },
      { date: '2031', value: 8.5, probability: 92 },
      { date: '2032', value: 9, probability: 95 },
      { date: '2033', value: 9.5, probability: 97 }
    ],
    ctaLink: 'https://www.agencebio.org'
  },
  'tech-opp-precision': {
    id: 'tech-opp-precision',
    type: 'opportunity',
    title: 'Agriculture de Précision',
    stakeholder: 'MaeLabs',
    description: 'Optimisation des ressources grâce aux nouvelles technologies',
    impact: {
      withAction: '+25% augmentation de la productivité\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% augmentation de la productivité\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Former les équipes aux nouvelles technologies',
      'Investir dans des outils connectés',
      'Analyser les données collectées'
    ],
    evolution: [
      { date: '2024', value: 4, probability: 50 },
      { date: '2025', value: 4.5, probability: 55 },
      { date: '2026', value: 5, probability: 60 },
      { date: '2027', value: 5.5, probability: 65 },
      { date: '2028', value: 6, probability: 70 },
      { date: '2029', value: 6.5, probability: 75 },
      { date: '2030', value: 7, probability: 80 },
      { date: '2031', value: 7.5, probability: 85 },
      { date: '2032', value: 8, probability: 90 },
      { date: '2033', value: 8.5, probability: 95 }
    ],
    ctaLink: 'https://www.mae-labs.fr/precision-farming'
  },
  'local-opp-circuit': {
    id: 'local-opp-circuit',
    type: 'opportunity',
    title: 'Circuits Courts',
    stakeholder: 'Collectivités',
    description: 'Développement de la vente directe et locale',
    impact: {
      withAction: '+20% augmentation des ventes\n• Meilleure valorisation\n• Développement durable\n• Réduction des coûts',
      withoutAction: '+5% augmentation des ventes\n• Concurrence accrue\n• Prix instables\n• Risques de déclassement'
    },
    recommendations: [
      'Étudier la demande locale',
      'Développer des partenariats',
      'Adapter la production'
    ],
    evolution: [
      { date: '2024', value: 3, probability: 40 },
      { date: '2025', value: 3.5, probability: 45 },
      { date: '2026', value: 4, probability: 50 },
      { date: '2027', value: 4.5, probability: 55 },
      { date: '2028', value: 5, probability: 60 },
      { date: '2029', value: 5.5, probability: 65 },
      { date: '2030', value: 6, probability: 70 },
      { date: '2031', value: 6.5, probability: 75 },
      { date: '2032', value: 7, probability: 80 },
      { date: '2033', value: 7.5, probability: 85 }
    ],
    ctaLink: 'https://www.collectivites-locales.gouv.fr/circuits-courts'
  },
  'subsidy-opp-green': {
    id: 'subsidy-opp-green',
    type: 'opportunity',
    title: 'Aides Écologiques',
    stakeholder: 'État',
    description: 'Subventions pour la transition écologique',
    impact: {
      withAction: '+25% augmentation des aides\n• Réduction des coûts\n• Amélioration des rendements\n• Développement durable',
      withoutAction: '+5% augmentation des aides\n• Coûts élevés\n• Rendements instables\n• Risques de déclassement'
    },
    recommendations: [
      'Identifier les aides disponibles',
      'Préparer les dossiers de demande',
      'Suivre les nouvelles mesures'
    ],
    evolution: [
      { date: '2024', value: 6, probability: 70 },
      { date: '2025', value: 6.5, probability: 75 },
      { date: '2026', value: 7, probability: 80 },
      { date: '2027', value: 7.5, probability: 85 },
      { date: '2028', value: 8, probability: 90 },
      { date: '2029', value: 8.5, probability: 92 },
      { date: '2030', value: 9, probability: 95 },
      { date: '2031', value: 9.5, probability: 97 },
      { date: '2032', value: 10, probability: 98 },
      { date: '2033', value: 10, probability: 99 }
    ],
    ctaLink: 'https://www.economie.gouv.fr/plan-de-relance/profils/entreprises/aides-transition-ecologique'
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isRisk = payload[0].stroke === '#ef4444';
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="text-sm font-medium mb-1">{label}</p>
        <p className="text-sm">
          <span className="text-gray-600">
            {isRisk ? 'Niveau de Risque' : 'Potentiel'}:
          </span>{' '}
          {payload[0].value}/10
          {isRisk ? 
            ` (${payload[0].value >= 7 ? 'Critique' : payload[0].value >= 4 ? 'Modéré' : 'Faible'})`
            : 
            ` (${payload[0].value >= 7 ? 'Fort' : payload[0].value >= 4 ? 'Modéré' : 'Faible'})`
          }
        </p>
        <p className="text-sm">
          <span className="text-gray-600">Probabilité:</span> {payload[1].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function RiskOpportunityEvolution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const item = data[id || ''];

  const handleBack = () => {
    navigate('/business-plan', { state: { activeTab: 'risks' } });
  };

  if (!item) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux Risques Principaux
        </Button>
        <div className="text-center py-8">
          Élément non trouvé
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien a été copié dans votre presse-papiers",
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux Risques Principaux
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button variant="outline">
            <BookmarkPlus className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          <p className="text-gray-500">Identifié par {item.stakeholder}</p>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-900">{item.description}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Impact</h3>
            <div className="text-gray-900">
              <p><strong>Avec action:</strong> {item.impact.withAction}</p>
              <p><strong>Sans action:</strong> {item.impact.withoutAction}</p>
            </div>
          </div>
        </div>

        {/* Evolution Chart */}
        <div>
          <h3 className="text-lg font-medium mb-4">Évolution 2024-2033</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={item.evolution}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => value}
                    ticks={item.evolution.map(e => e.date)}
                  />
                  <YAxis 
                    yAxisId="left" 
                    domain={[0, 10]} 
                    tickFormatter={(value) => value.toFixed(1)}
                    label={{ 
                      value: item.type === 'risk' ? 'Niveau de Risque' : 'Potentiel',
                      angle: -90,
                      position: 'insideLeft'
                    }}
                    reversed={item.type === 'risk'}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    label={{ 
                      value: 'Probabilité',
                      angle: 90,
                      position: 'insideRight'
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="value" 
                    name={item.type === 'risk' ? 'Sans Action' : 'Sans Action'}
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="probability" 
                    name="Avec Action"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {item.type === 'risk' ? (
                <p>Note: Une tendance à la baisse indique une réduction du risque (amélioration)</p>
              ) : (
                <p>Note: Une tendance à la hausse indique une augmentation du potentiel (amélioration)</p>
              )}
            </div>
          </div>
        </div>

        {/* Info and Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calculation Method */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Comment calculons-nous ?</h3>
            <div className="text-gray-700">
              {item.id === 'maelab-risk-soil' ? (
                <div>
                  <p>Notre évaluation de la dégradation des sols est basée sur trois facteurs clés :</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Analyses de sol annuelles (taux de matière organique, pH, structure)</li>
                    <li>Historique des rendements sur les 5 dernières années</li>
                    <li>Indicateurs biologiques (présence de vers de terre, activité microbienne)</li>
                  </ul>
                  <p className="mt-2">La probabilité est calculée en fonction des pratiques culturales actuelles et des conditions climatiques prévues.</p>
                </div>
              ) : item.id === 'ca-risk-debt' ? (
                <div>
                  <p>L'évaluation du risque d'endettement est calculée selon :</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Ratio d'endettement (dettes totales/chiffre d'affaires)</li>
                    <li>Capacité de remboursement mensuelle</li>
                    <li>Évolution de la trésorerie sur 12 mois</li>
                  </ul>
                  <p className="mt-2">La probabilité évolue en fonction des projections financières et des conditions du marché.</p>
                </div>
              ) : (
                <div>
                  <p>Notre évaluation de la trésorerie est basée sur :</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Cycle de trésorerie mensuel (entrées/sorties)</li>
                    <li>Délais moyens de paiement clients/fournisseurs</li>
                    <li>Saisonnalité des revenus agricoles</li>
                  </ul>
                  <p className="mt-2">La probabilité reflète les variations saisonnières et les tendances historiques.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col h-full">
            <h3 className="text-lg font-medium mb-4">Que dois-je faire ?</h3>
            <ul className="space-y-2 flex-grow">
              {item.recommendations.map((recommendation, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            {item.ctaLink && (
              <div className="flex justify-end mt-4">
                <a 
                  href={item.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors"
                >
                  Télécharger
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
