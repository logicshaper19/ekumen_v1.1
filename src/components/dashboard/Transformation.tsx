import React, { useState } from 'react';
import { TrendingUp, Clock, Sprout, Droplets, Leaf, Factory, ArrowRight, Zap, Cloud, Coins, Users, ChevronRight, ArrowLeft, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const transformations = [
  {
    id: 'regenerative',
    title: "Agriculture Régénératrice",
    shortDesc: "Régénérez vos sols et augmentez votre résilience",
    description: "Adoptez des pratiques qui régénèrent les sols face aux changements climatiques tout en améliorant votre rentabilité",
    icon: Leaf,
    benefits: [
      "Résilience accrue aux conditions météorologiques extrêmes",
      "Réduction des coûts d'intrants",
      "Amélioration de la qualité des sols",
      "Accès aux primes carbone"
    ],
    kpis: [
      { title: "Réduction des Coûts", value: "-30%", icon: Coins },
      { title: "Matière Organique", value: "+2.5%", icon: Sprout },
      { title: "Rendement", value: "+15%", icon: Target },
    ],
    steps: [
      "Réaliser un diagnostic de vos sols",
      "Former votre équipe aux pratiques régénératrices",
      "Mettre en place un plan de rotation des cultures",
      "Implanter des couverts végétaux"
    ]
  },
  {
    id: 'energy',
    title: "Transformation Énergétique",
    shortDesc: "Réduisez votre dépendance énergétique",
    description: "Réduisez votre dépendance aux énergies fossiles et maîtrisez vos coûts énergétiques à long terme",
    icon: Zap,
    benefits: [
      "Indépendance énergétique",
      "Réduction des coûts opérationnels",
      "Subventions disponibles",
      "Impact environnemental positif"
    ],
    kpis: [
      { title: "Économies Annuelles", value: "25k€", icon: Coins },
      { title: "Autonomie", value: "80%", icon: Zap },
      { title: "CO2 Évité", value: "-45t", icon: Leaf },
    ],
    steps: [
      "Réaliser un audit énergétique",
      "Identifier les solutions adaptées",
      "Monter les dossiers de financement",
      "Installer les équipements"
    ]
  },
  {
    id: 'digital',
    title: "Agriculture Connectée",
    shortDesc: "Optimisez grâce au numérique",
    description: "Optimisez vos opérations grâce aux technologies numériques et à l'agriculture de précision",
    icon: Cloud,
    benefits: [
      "Optimisation de l'irrigation",
      "Réduction des intrants",
      "Suivi précis des cultures",
      "Aide à la décision"
    ],
    kpis: [
      { title: "Productivité", value: "+20%", icon: Target },
      { title: "Intrants", value: "-15%", icon: Droplets },
      { title: "ROI", value: "250%", icon: Coins },
    ],
    steps: [
      "Cartographier vos parcelles",
      "Installer les capteurs",
      "Former aux outils numériques",
      "Analyser et optimiser"
    ]
  },
  {
    id: 'processing',
    title: "Transformation à la Ferme",
    shortDesc: "Créez plus de valeur sur place",
    description: "Créez de la valeur ajoutée en transformant vos produits directement sur votre exploitation",
    icon: Factory,
    benefits: [
      "Meilleure valorisation",
      "Contrôle de la chaîne de valeur",
      "Relation directe consommateur",
      "Indépendance commerciale"
    ],
    kpis: [
      { title: "Marge", value: "+45%", icon: Coins },
      { title: "Clients Directs", value: "120", icon: Users },
      { title: "Valorisation", value: "2.5x", icon: Target },
    ],
    steps: [
      "Étudier le marché local",
      "Concevoir votre atelier",
      "Obtenir les certifications",
      "Développer vos produits"
    ]
  }
];

export function Transformation() {
  const [selectedTransform, setSelectedTransform] = useState(null);

  if (selectedTransform) {
    const transform = transformations.find(t => t.id === selectedTransform);
    return (
      <div className="space-y-8">
        <div>
          <button 
            onClick={() => setSelectedTransform(null)}
            className="flex items-center text-sm text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux transformations
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{transform.title}</h1>
          <p className="mt-2 text-gray-600">{transform.description}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transform.kpis.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits and Steps side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Benefits */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Bénéfices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {transform.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transform.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-600 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add to Strategy Button */}
        <div className="flex justify-end">
          <Button className="bg-teal-700 text-white hover:bg-teal-800 px-6">
            Ajouter à ma stratégie
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transformation</h1>
        <p className="mt-2 text-gray-600">
          Découvrez les opportunités de transformation pour votre exploitation
        </p>
      </div>

      <div className="grid gap-4">
        {transformations.map((transform) => (
          <Card 
            key={transform.id}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setSelectedTransform(transform.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/5">
                    <transform.icon className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <CardTitle>{transform.title}</CardTitle>
                    <p className="text-sm text-gray-600">{transform.shortDesc}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}