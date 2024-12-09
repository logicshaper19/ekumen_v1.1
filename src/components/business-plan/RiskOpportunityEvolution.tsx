import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Info, Calculator, Lightbulb, ChevronRight } from 'lucide-react';

interface EvolutionData {
  year: number;
  impact: number;
  probability: number;
}

const generateEvolutionData = (startYear: number = 2024): EvolutionData[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    year: startYear + i,
    impact: Math.round((50 + Math.sin(i * 0.5) * 20 + Math.random() * 10) * 10) / 10,
    probability: Math.round((40 + Math.cos(i * 0.3) * 15 + Math.random() * 8) * 10) / 10,
  }));
};

const riskOpportunityData: Record<string, {
  title: string;
  type: 'risk' | 'opportunity';
  description: string;
  source: {
    description: string;
    methodology: string[];
  };
  recommendations: string[];
}> = {
  'changement-climatique': {
    title: 'Changement Climatique',
    type: 'risk',
    description: 'Impact potentiel des conditions météorologiques extrêmes sur les cultures',
    source: {
      description: 'Les données sont fournies par MaeLabs, qui utilise une combinaison de données historiques météorologiques, de modèles climatiques et d\'analyses d\'experts.',
      methodology: [
        'Analyse des données météorologiques des 30 dernières années',
        'Utilisation de modèles climatiques régionaux',
        'Évaluation de l\'impact sur les rendements agricoles',
        'Consultation d\'experts en agronomie et climatologie'
      ]
    },
    recommendations: [
      'Diversifier les cultures pour réduire la vulnérabilité',
      'Installer des systèmes d\'irrigation efficaces',
      'Adopter des variétés résistantes aux conditions extrêmes',
      'Mettre en place des systèmes de protection contre les intempéries'
    ]
  },
  'volatilite-prix': {
    title: 'Volatilité des Prix',
    type: 'risk',
    description: 'Fluctuations des prix du marché affectant la rentabilité',
    source: {
      description: 'MaeLabs analyse les tendances des marchés agricoles et les facteurs économiques influençant les prix.',
      methodology: [
        'Analyse des données historiques des prix sur 10 ans',
        'Étude des facteurs macro-économiques',
        'Modélisation des tendances de marché',
        'Consultation d\'experts en économie agricole'
      ]
    },
    recommendations: [
      'Diversifier les canaux de vente',
      'Établir des contrats à terme',
      'Développer la vente directe',
      'Rejoindre une coopérative agricole'
    ]
  },
  'reglementation-evolutive': {
    title: 'Réglementation Évolutive',
    type: 'risk',
    description: 'Nouvelles normes environnementales nécessitant des adaptations',
    source: {
      description: 'MaeLabs suit l\'évolution réglementaire et évalue son impact sur les exploitations agricoles.',
      methodology: [
        'Veille réglementaire continue',
        'Analyse des projets de loi en cours',
        'Évaluation de l\'impact économique des nouvelles normes',
        'Consultation d\'experts juridiques'
      ]
    },
    recommendations: [
      'Anticiper les changements réglementaires',
      'Participer aux consultations publiques',
      'Investir dans des équipements conformes',
      'Se former aux nouvelles pratiques'
    ]
  },
  'agriculture-biologique': {
    title: 'Agriculture Biologique',
    type: 'opportunity',
    description: 'Potentiel de conversion avec primes de prix',
    source: {
      description: 'MaeLabs analyse le marché du bio et les tendances de consommation pour évaluer le potentiel.',
      methodology: [
        'Étude de marché du secteur bio',
        'Analyse des coûts de conversion',
        'Évaluation des primes de prix',
        'Consultation d\'agriculteurs bio expérimentés'
      ]
    },
    recommendations: [
      'Commencer la conversion sur une partie de l\'exploitation',
      'Se former aux pratiques biologiques',
      'Développer un réseau de distribution bio',
      'Étudier les aides à la conversion'
    ]
  },
  'irrigation-efficace': {
    title: 'Irrigation Efficace',
    type: 'opportunity',
    description: 'Modernisation du système d\'irrigation pour économiser l\'eau',
    source: {
      description: 'MaeLabs évalue les technologies d\'irrigation et leur retour sur investissement.',
      methodology: [
        'Analyse des systèmes d\'irrigation existants',
        'Étude des nouvelles technologies',
        'Calcul des économies d\'eau potentielles',
        'Évaluation du retour sur investissement'
      ]
    },
    recommendations: [
      'Réaliser un audit du système actuel',
      'Tester des capteurs d\'humidité',
      'Installer un système de goutte-à-goutte',
      'Former le personnel aux nouvelles technologies'
    ]
  },
  'energie-renouvelable': {
    title: 'Énergie Renouvelable',
    type: 'opportunity',
    description: 'Installation potentielle d\'éoliennes pour la production d\'énergie',
    source: {
      description: 'MaeLabs évalue le potentiel de production d\'énergie renouvelable sur les exploitations agricoles.',
      methodology: [
        'Étude du potentiel éolien/solaire du site',
        'Analyse des coûts d\'installation',
        'Calcul du retour sur investissement',
        'Évaluation des aides disponibles'
      ]
    },
    recommendations: [
      'Réaliser une étude de faisabilité',
      'Contacter des installateurs certifiés',
      'Explorer les options de financement',
      'Étudier les programmes d\'aide gouvernementaux'
    ]
  },
};

export function RiskOpportunityEvolution() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = generateEvolutionData();
  const itemData = id ? riskOpportunityData[id] : null;

  if (!itemData) {
    return <div>Item non trouvé</div>;
  }

  const isRisk = itemData.type === 'risk';
  const colorScheme = isRisk ? '#ef4444' : '#22c55e';

  return (
    <div className="space-y-6 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold mb-2">{itemData.title}</h1>
          <p className="text-gray-600 mb-6">{itemData.description}</p>

          {/* Chart Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-4">
                Évolution sur 10 ans ({isRisk ? 'Impact et Probabilité' : 'Potentiel et Probabilité de Réalisation'})
              </h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={isRisk ? 'impact' : 'impact'}
                      name={isRisk ? 'Impact (%)' : 'Potentiel (%)'}
                      stroke={colorScheme}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="probability"
                      name="Probabilité (%)"
                      stroke="#6b7280"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Source and Recommendations Section - Side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Source and Methodology Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-medium">Sources et Méthodes de Calcul</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">D'où viennent ces informations ?</h3>
                <p className="text-gray-600">{itemData.source.description}</p>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Méthodologie</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {itemData.source.methodology.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-medium">Que puis-je faire ?</h2>
            </div>
            
            <ul className="space-y-3 flex-grow">
              {itemData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                  </div>
                  <span className="text-gray-600">{recommendation}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigate('/community')}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-teal-700 text-white hover:bg-teal-800"
              >
                Explorer
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
