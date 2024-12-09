import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RiskOpportunityData {
  id: string;
  type: 'risk' | 'opportunity';
  title: string;
  stakeholder: string;
  description: string;
  impact: string;
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
    stakeholder: 'MaeLabs',
    description: 'Perte de fertilité des sols due aux pratiques intensives',
    impact: 'Baisse des rendements et hausse des coûts',
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
  'ca-risk-debt': {
    id: 'ca-risk-debt',
    type: 'risk',
    title: 'Endettement Excessif',
    stakeholder: 'Crédit Agricole',
    description: 'Risque de surendettement lié aux investissements',
    impact: 'Difficultés de remboursement et stress financier',
    recommendations: [
      'Planifier les investissements sur le long terme',
      'Diversifier les sources de financement',
      'Maintenir une réserve de trésorerie'
    ],
    evolution: [
      { date: '2024', value: 5, probability: 60 },
      { date: '2025', value: 5.5, probability: 65 },
      { date: '2026', value: 6, probability: 70 },
      { date: '2027', value: 5.5, probability: 65 },
      { date: '2028', value: 5, probability: 60 },
      { date: '2029', value: 4.5, probability: 55 },
      { date: '2030', value: 4, probability: 50 },
      { date: '2031', value: 3.5, probability: 45 },
      { date: '2032', value: 3, probability: 40 },
      { date: '2033', value: 2.5, probability: 35 }
    ],
    ctaLink: 'https://www.credit-agricole.fr/particuliers/financer-un-projet'
  },
  'accountant-risk-cash': {
    id: 'accountant-risk-cash',
    type: 'risk',
    title: 'Trésorerie Tendue',
    stakeholder: 'Comptable',
    description: 'Difficultés de trésorerie saisonnières',
    impact: 'Retards de paiement et tension avec les fournisseurs',
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
    impact: 'Pénalités et perte d\'aides PAC',
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
    impact: 'Déclassement des produits et perte de valeur',
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
    impact: 'Rupture de contrat et perte de débouchés',
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
  'insurance-risk-coverage': {
    id: 'insurance-risk-coverage',
    type: 'risk',
    title: 'Couverture Inadaptée',
    stakeholder: 'Assurance',
    description: 'Risque de pertes non couvertes',
    impact: 'Pertes financières en cas de sinistre',
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
    impact: 'Réduction des coûts et meilleurs rendements',
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
    impact: 'Taux préférentiels et image positive',
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
    impact: 'Économies fiscales et modernisation',
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
    impact: 'Soutien financier aux pratiques vertueuses',
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
    impact: 'Réduction des coûts d\'exploitation',
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
    impact: 'Meilleurs prix et débouchés garantis',
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
    impact: 'Meilleure protection contre les aléas',
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
  }
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = data[id || ''];

  if (!item) {
    return <div>Item not found</div>;
  }

  const currentProbability = item.evolution[0].probability;
  
  const handleBack = () => {
    navigate('/business-plan', { 
      state: { activeTab: item.type === 'risk' ? 'risks' : 'opportunities' }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <button 
          onClick={handleBack}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour aux {item.type === 'risk' ? 'Risques Principaux' : 'Opportunités Clés'}
        </button>

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
              <p className="text-gray-900">{item.impact}</p>
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
                      name={item.type === 'risk' ? 'Niveau de Risque' : 'Potentiel'}
                      stroke={item.type === 'risk' ? '#ef4444' : '#22c55e'}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="probability" 
                      name="Probabilité"
                      stroke="#6366f1"
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
                    Explorer
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
