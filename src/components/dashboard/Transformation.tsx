import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChevronRight, Coins, Clock, Droplets, Factory, Leaf, Sprout, Target, TrendingUp, ArrowRight, Zap, Cloud, Users, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface TransformationData {
  id: number
  icon: any
  title: string
  shortDesc: string
  description: string
  benefits: string[]
  kpis: {
    title: string
    value: string
    icon: any
  }[]
  steps: string[]
}

export const transformations: TransformationData[] = [
  {
    id: 1,
    icon: Sprout,
    title: "Agriculture régénératrice",
    shortDesc: "Améliorer la santé des sols et la biodiversité",
    description:
      "L'agriculture régénératrice est une approche qui vise à restaurer la santé des sols tout en maintenant une production rentable. Elle combine plusieurs pratiques comme la rotation des cultures, la couverture permanente des sols et la réduction du travail du sol.",
    benefits: [
      "Amélioration de la structure et fertilité du sol",
      "Réduction des coûts en intrants",
      "Meilleure rétention d'eau",
      "Augmentation de la biodiversité",
      "Plus grande résilience aux aléas climatiques"
    ],
    kpis: [
      {
        title: "Économie d'intrants",
        value: "80€/ha",
        icon: Coins
      },
      {
        title: "Gain matière organique",
        value: "+6%",
        icon: Sprout
      },
      {
        title: "Rétention d'eau",
        value: "12mm",
        icon: Droplets
      }
    ],
    steps: [
      "Réaliser un diagnostic initial des sols",
      "Planifier la rotation des cultures",
      "Introduire des couverts végétaux",
      "Réduire progressivement le travail du sol",
      "Suivre l'évolution des indicateurs"
    ]
  },
  {
    id: 2,
    icon: Leaf,
    title: "Certification Bio",
    shortDesc: "Transition vers l'agriculture biologique",
    description:
      "La certification biologique permet de valoriser une production respectueuse de l'environnement. Elle implique l'abandon des pesticides et engrais de synthèse au profit de méthodes naturelles.",
    benefits: [
      "Prix de vente plus élevés",
      "Accès à de nouveaux marchés",
      "Impact environnemental réduit",
      "Meilleure image auprès des consommateurs",
      "Indépendance vis-à-vis des intrants chimiques"
    ],
    kpis: [
      {
        title: "Prime de vente",
        value: "+7%",
        icon: Coins
      },
      {
        title: "Score biodiversité",
        value: "8/10",
        icon: Sprout
      },
      {
        title: "Retour sur invest.",
        value: "2 ans",
        icon: Clock
      }
    ],
    steps: [
      "Étudier le cahier des charges bio",
      "Contacter un organisme certificateur",
      "Planifier la période de conversion",
      "Adapter ses pratiques culturales",
      "Développer ses débouchés commerciaux"
    ]
  },
  {
    id: 3,
    icon: Droplets,
    title: "Irrigation de précision",
    shortDesc: "Optimiser la gestion de l'eau",
    description:
      "L'irrigation de précision permet d'optimiser l'utilisation de l'eau en apportant la juste dose au bon moment. Elle s'appuie sur des capteurs et des outils d'aide à la décision.",
    benefits: [
      "Économies d'eau significatives",
      "Meilleure croissance des cultures",
      "Réduction des maladies fongiques",
      "Optimisation du temps de travail",
      "Diminution de la facture d'eau"
    ],
    kpis: [
      {
        title: "Économie d'eau",
        value: "850m³",
        icon: Droplets
      },
      {
        title: "Gain rendement",
        value: "+5%",
        icon: Target
      },
      {
        title: "Coût irrigation",
        value: "-120€",
        icon: Coins
      }
    ],
    steps: [
      "Cartographier son parcellaire",
      "Installer des sondes d'humidité",
      "Mettre en place un système de pilotage",
      "Former le personnel",
      "Suivre les indicateurs de performance"
    ]
  },
  {
    id: 4,
    icon: Factory,
    title: "Méthanisation agricole",
    shortDesc: "Produire de l'énergie à partir des déchets",
    description:
      "La méthanisation permet de valoriser les effluents d'élevage et résidus de culture en produisant du biogaz et un digestat utilisable comme fertilisant.",
    benefits: [
      "Nouvelle source de revenus",
      "Valorisation des déchets",
      "Production d'un fertilisant naturel",
      "Réduction des émissions de GES",
      "Autonomie énergétique accrue"
    ],
    kpis: [
      {
        title: "Revenu additionnel",
        value: "15k€",
        icon: Coins
      },
      {
        title: "Économie engrais",
        value: "2.5t",
        icon: Droplets
      },
      {
        title: "ROI",
        value: "4 ans",
        icon: Clock
      }
    ],
    steps: [
      "Évaluer le gisement disponible",
      "Réaliser une étude de faisabilité",
      "Monter le plan de financement",
      "Obtenir les autorisations",
      "Construire et mettre en service"
    ]
  }
];

export function Transformation() {
  const navigate = useNavigate()

  const farmKPIs = [
    {
      title: "Temps de mise en œuvre",
      value: "2-3 ans",
      icon: Clock,
      description: "Durée moyenne pour une transformation complète"
    },
    {
      title: "Impact sur le rendement",
      value: "+12%",
      icon: TrendingUp,
      description: "Augmentation moyenne des rendements après 3 ans"
    },
    {
      title: "Impact sur les revenus",
      value: "+15%",
      icon: Coins,
      description: "Amélioration du revenu net après transformation"
    },
    {
      title: "Score environnemental",
      value: "A+",
      icon: Leaf,
      description: "Impact positif sur la biodiversité et les sols"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Transformations pour votre exploitation</h1>
        <p className="text-gray-600">
          Voici une sélection de transformations adaptées à votre exploitation. Chaque transformation 
          a été choisie pour maximiser votre impact tout en respectant vos objectifs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {farmKPIs.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <kpi.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <h3 className="text-2xl font-bold">{kpi.value}</h3>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Transformations disponibles</h2>
        <div className="grid gap-4">
          {transformations.map((transform) => (
            <Card 
              key={transform.id}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => navigate(`/transformation/${transform.id}/details`)}
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
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal-700">
                        {transform.kpis[0].value}
                      </p>
                      <p className="text-sm text-gray-600">
                        {transform.kpis[0].title}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}