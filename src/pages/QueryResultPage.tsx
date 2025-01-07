import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, AlertTriangle, Info, Lock } from 'lucide-react';

interface QueryResultProps {
  onBack?: () => void;
}

const mockPriceData = [
  { month: 'Jan', price: 240 },
  { month: 'Feb', price: 238 },
  { month: 'Mar', price: 245 },
  { month: 'Apr', price: 250 },
  { month: 'May', price: 248 },
  { month: 'Jun', price: 252 }
];

const mockMarketShare = [
  { region: 'Europe', share: 35 },
  { region: 'Amérique', share: 28 },
  { region: 'Asie', share: 22 },
  { region: 'Afrique', share: 15 }
];

const mockRiskData = [
  { risk: 'Climatique', impact: 75 },
  { risk: 'Marché', impact: 65 },
  { risk: 'Production', impact: 55 },
  { risk: 'Logistique', impact: 45 }
];

const mockSupportData = [
  { month: 'Jan', consultations: 15 },
  { month: 'Feb', consultations: 18 },
  { month: 'Mar', consultations: 25 },
  { month: 'Apr', consultations: 22 },
  { month: 'May', consultations: 30 },
  { month: 'Jun', consultations: 28 }
];

export function QueryResultPage({ onBack }: QueryResultProps) {
  const location = useLocation();
  const query = location.state?.query || '';
  const analysisType = location.state?.analysisType || '';

  const renderAnalysisContent = () => {
    switch (analysisType) {
      case 'market':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Price Trends */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  Évolution des Prix
                </h3>
                
                {/* Price Context */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Prix Actuel:</span>
                    <span>252 €/tonne</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Variation:</span>
                    <span>+5% depuis janvier</span>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-md text-sm">
                    <p className="text-teal-800">
                      Les prix ont montré une tendance à la hausse stable depuis le début de l'année, 
                      principalement due à une forte demande du secteur de l'élevage.
                    </p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPriceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="price" stroke="#004D40" name="Prix (€/tonne)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Market Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-teal-600" />
                  Distribution du Marché
                </h3>

                {/* Market Context */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Marché Principal:</span>
                    <span>Europe (35% des parts)</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Croissance:</span>
                    <span>+2.5% en Europe, +1.8% en Amérique</span>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-md text-sm">
                    <p className="text-teal-800">
                      L'Europe reste le plus grand marché, suivie par l'Amérique. 
                      La croissance est particulièrement forte dans les régions où la demande augmente.
                    </p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockMarketShare}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="share" fill="#004D40" name="Part de Marché (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </>
        );

      case 'risks':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Risk Impact Analysis */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-teal-600" />
                  Impact des Risques
                </h3>
                
                {/* Risk Context */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Risque Principal:</span>
                    <span>Risques Climatiques (75% d'impact)</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Tendance:</span>
                    <span>Augmentation des risques climatiques</span>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-md text-sm">
                    <p className="text-teal-800">
                      Les risques climatiques représentent la plus grande menace, 
                      suivis par les risques de marché et de production.
                    </p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockRiskData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="risk" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="impact" fill="#004D40" name="Impact (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Risk Management Strategies */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Stratégies de Gestion</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Risques Climatiques</h4>
                    <ul className="list-disc pl-4 text-sm text-teal-600 space-y-1">
                      <li>Installation de systèmes d'irrigation efficaces</li>
                      <li>Diversification des cultures</li>
                      <li>Utilisation de variétés résistantes</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Risques de Marché</h4>
                    <ul className="list-disc pl-4 text-sm text-teal-600 space-y-1">
                      <li>Contrats à terme</li>
                      <li>Diversification des canaux de vente</li>
                      <li>Stockage stratégique</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Risques de Production</h4>
                    <ul className="list-disc pl-4 text-sm text-teal-600 space-y-1">
                      <li>Maintenance préventive du matériel</li>
                      <li>Formation continue du personnel</li>
                      <li>Protocoles sanitaires stricts</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </>
        );

      case 'support':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Support Utilization */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-teal-600" />
                  Utilisation du Support
                </h3>
                
                {/* Support Context */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Consultations:</span>
                    <span>28 ce mois</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-medium text-teal-600">Tendance:</span>
                    <span>+86% depuis janvier</span>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-md text-sm">
                    <p className="text-teal-800">
                      L'utilisation du support technique est en augmentation constante, 
                      reflétant une demande croissante pour l'expertise agricole.
                    </p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockSupportData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="consultations" stroke="#004D40" name="Consultations" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Support Services */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Services Disponibles</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Conseil Technique</h4>
                    <ul className="list-disc pl-4 text-sm text-teal-600 space-y-1">
                      <li>Optimisation des pratiques culturales</li>
                      <li>Choix des variétés</li>
                      <li>Gestion des intrants</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Accompagnement Stratégique</h4>
                    <ul className="list-disc pl-4 text-sm text-teal-600 space-y-1">
                      <li>Planification des cultures</li>
                      <li>Analyse de rentabilité</li>
                      <li>Stratégie de commercialisation</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Support Administratif</h4>
                    <ul className="list-disc pl-4 text-sm text-teal-600 space-y-1">
                      <li>Aide aux démarches réglementaires</li>
                      <li>Suivi des certifications</li>
                      <li>Gestion des dossiers de subvention</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderPremiumTeaser = () => {
    const teaserContent = {
      market: {
        title: "Fonctionnalités Premium - Analyse de Marché",
        features: [
          {
            title: "Prévisions Avancées",
            description: "Accédez à nos modèles prédictifs sur 12 mois avec 92% de précision"
          },
          {
            title: "Alertes Personnalisées",
            description: "Recevez des notifications en temps réel sur les variations de prix importantes"
          },
          {
            title: "Rapports Détaillés",
            description: "Téléchargez des rapports hebdomadaires avec analyses approfondies"
          }
        ]
      },
      risks: {
        title: "Fonctionnalités Premium - Gestion des Risques",
        features: [
          {
            title: "Analyse Prédictive des Risques",
            description: "Anticipez les risques potentiels grâce à l'intelligence artificielle"
          },
          {
            title: "Plans de Mitigation Personnalisés",
            description: "Obtenez des stratégies sur mesure pour votre exploitation"
          },
          {
            title: "Tableau de Bord des Risques",
            description: "Suivez tous vos indicateurs de risque en temps réel"
          }
        ]
      },
      support: {
        title: "Fonctionnalités Premium - Support",
        features: [
          {
            title: "Conseil Personnalisé",
            description: "Accédez à nos experts agricoles 24/7"
          },
          {
            title: "Formations Exclusives",
            description: "Participez à nos webinaires et formations spécialisées"
          },
          {
            title: "Réseau d'Experts",
            description: "Connectez-vous avec d'autres agriculteurs et experts du secteur"
          }
        ]
      }
    };

    const content = teaserContent[analysisType as keyof typeof teaserContent];
    if (!content) return null;

    return (
      <div className="mt-8">
        <Card className="p-6 bg-gradient-to-r from-teal-50 to-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-teal-800">
              <Lock className="h-5 w-5 text-teal-600" />
              {content.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {content.features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm border border-teal-100"
                >
                  <h4 className="font-medium text-teal-800 mb-2">{feature.title}</h4>
                  <p className="text-sm text-teal-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-teal-700 text-center max-w-xl">
                Débloquez toutes nos fonctionnalités premium et optimisez la gestion de votre exploitation 
                agricole avec un accès complet à nos outils d'analyse et d'aide à la décision.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate('/signup-flow')}
                  className="bg-teal-600 text-white hover:bg-teal-700 px-6"
                >
                  Commencer Gratuitement
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  Déjà Inscrit ? Se Connecter
                </Button>
              </div>
              <p className="text-xs text-teal-600 mt-2">
                Essai gratuit de 30 jours • Pas de carte bancaire requise
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="border-b bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.history.back()}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-xl font-semibold">Résultats de l'Analyse</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Query Summary */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-teal-600" />
            Résumé de la Requête
          </h2>
          <p className="text-gray-600">{query}</p>
        </Card>

        {renderAnalysisContent()}
        {renderPremiumTeaser()}
      </div>
    </div>
  );
}
