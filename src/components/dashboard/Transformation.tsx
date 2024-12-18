import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronRight, 
  Coins, 
  Clock, 
  Droplets, 
  Factory, 
  Leaf, 
  Sprout, 
  Target, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  Cloud, 
  Users, 
  ArrowLeft,
  Tractor,
  Wheat,
  Sun
} from "lucide-react"
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
    yield: number
    margin: number
    workingTime: number
    gesEmissions: number
    lixiviation: number
    n2oEmissions: number
    soilQuality: number
    organicMatter: number
    biodiversity: number
  }
  steps: string[]
}

export const strategicTransformations: TransformationData[] = [
  {
    id: 1,
    icon: Sprout,
    title: "Agriculture régénérative",
    shortDesc: "Améliorer la santé des sols et la biodiversité",
    description:
      "L'agriculture régénérative vise à restaurer la santé des sols tout en augmentant la rentabilité.",
    benefits: [
      "Amélioration de la structure du sol",
      "Augmentation de la biodiversité",
      "Réduction des intrants",
      "Meilleure rétention d'eau"
    ],
    kpis: {
      yield: 15,
      margin: 250,
      workingTime: 8.5,
      gesEmissions: 2.3,
      lixiviation: 15,
      n2oEmissions: 3.2,
      soilQuality: 8.5,
      organicMatter: 3.2,
      biodiversity: 75
    },
    steps: [
      "Analyse initiale des sols",
      "Formation aux pratiques régénératives",
      "Mise en place des couverts végétaux",
      "Suivi et ajustements"
    ]
  },
  {
    id: 2,
    icon: Wheat,
    title: "Diversification des cultures",
    shortDesc: "Optimiser la rotation des cultures",
    description:
      "Une approche stratégique pour améliorer la santé des sols et réduire les risques.",
    benefits: [
      "Réduction des risques",
      "Amélioration de la fertilité",
      "Contrôle naturel des ravageurs",
      "Nouvelles sources de revenus"
    ],
    kpis: {
      yield: 12,
      margin: 180,
      workingTime: 7.2,
      gesEmissions: 1.8,
      lixiviation: 12,
      n2oEmissions: 2.8,
      soilQuality: 7.8,
      organicMatter: 2.8,
      biodiversity: 65
    },
    steps: [
      "Étude de marché",
      "Sélection des cultures",
      "Plan de rotation",
      "Mise en œuvre progressive"
    ]
  },
  {
    id: 5,
    icon: Users,
    title: "Coopérative agricole",
    shortDesc: "Mutualisation des ressources et savoirs",
    description:
      "La création ou l'intégration d'une coopérative agricole permet de mutualiser les ressources, partager les connaissances et renforcer le pouvoir de négociation.",
    benefits: [
      "Économies d'échelle sur les achats",
      "Meilleur pouvoir de négociation",
      "Partage d'expérience et de matériel",
      "Accès à de nouveaux marchés",
      "Réduction des risques"
    ],
    kpis: {
      yield: 0,
      margin: 0,
      workingTime: 0,
      gesEmissions: 0,
      lixiviation: 0,
      n2oEmissions: 0,
      soilQuality: 0,
      organicMatter: 0,
      biodiversity: 0
    },
    steps: [
      "Identifier les partenaires potentiels",
      "Définir le modèle de gouvernance",
      "Établir les statuts",
      "Mettre en place la structure",
      "Développer les services communs"
    ]
  }
];

export const nonStrategicTransformations: TransformationData[] = [
  {
    id: 3,
    icon: Tractor,
    title: "Agriculture de précision",
    shortDesc: "Optimiser l'utilisation des ressources",
    description:
      "Utilisation de technologies avancées pour une agriculture plus précise et efficace.",
    benefits: [
      "Réduction des coûts",
      "Optimisation des intrants",
      "Meilleure traçabilité",
      "Données précises pour la prise de décision"
    ],
    kpis: {
      yield: 8,
      margin: 0,
      workingTime: 0,
      gesEmissions: 0,
      lixiviation: 0,
      n2oEmissions: 0,
      soilQuality: 7.2,
      organicMatter: 0,
      biodiversity: 0
    },
    steps: [
      "Cartographie des parcelles",
      "Installation des capteurs",
      "Formation aux outils",
      "Analyse et optimisation"
    ]
  },
  {
    id: 4,
    icon: Sun,
    title: "Transition énergétique",
    shortDesc: "Vers l'autonomie énergétique",
    description:
      "La transition énergétique vise à réduire la dépendance aux énergies fossiles en favorisant les énergies renouvelables et l'efficacité énergétique sur l'exploitation.",
    benefits: [
      "Réduction des coûts énergétiques",
      "Indépendance énergétique",
      "Impact environnemental réduit",
      "Revenus complémentaires possibles",
      "Image positive"
    ],
    kpis: {
      yield: 0,
      margin: 0,
      workingTime: 0,
      gesEmissions: 0,
      lixiviation: 0,
      n2oEmissions: 0,
      soilQuality: 0,
      organicMatter: 0,
      biodiversity: 0
    },
    steps: [
      "Audit énergétique",
      "Étude de faisabilité",
      "Installation des équipements",
      "Raccordement au réseau",
      "Suivi de la production"
    ]
  },
  {
    id: 6,
    icon: Cloud,
    title: "Smart Farming",
    shortDesc: "Agriculture connectée et données",
    description:
      "Le Smart Farming utilise l'IoT, l'intelligence artificielle et le cloud computing pour optimiser la production agricole grâce à une prise de décision basée sur les données.",
    benefits: [
      "Optimisation des processus",
      "Prédiction des rendements",
      "Détection précoce des problèmes",
      "Réduction du gaspillage",
      "Traçabilité améliorée"
    ],
    kpis: {
      yield: 0,
      margin: 0,
      workingTime: 0,
      gesEmissions: 0,
      lixiviation: 0,
      n2oEmissions: 0,
      soilQuality: 0,
      organicMatter: 0,
      biodiversity: 0
    },
    steps: [
      "Déployer les capteurs IoT",
      "Configurer la plateforme cloud",
      "Former les équipes aux outils",
      "Intégrer les systèmes existants",
      "Mettre en place le monitoring"
    ]
  }
];

// Farm-wide KPIs
const farmKPIs = [
  {
    title: "Rendement",
    value: "+12%",
    icon: TrendingUp,
    description: "Après 3 ans"
  },
  {
    title: "Revenus",
    value: "+15%",
    icon: Coins,
    description: "D'amélioration du revenu net"
  },
  {
    title: "Environnement",
    value: "A+",
    icon: Leaf,
    description: "Biodiversité et sols positivement impactés"
  }
];

export function Transformation() {
  const navigate = useNavigate()

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Transformations pour votre exploitation</h1>
        <p className="text-muted-foreground mt-2">
          Découvrez les transformations disponibles pour votre exploitation, alignées ou non avec vos objectifs stratégiques.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {farmKPIs.map((kpi, i) => (
          <Card key={i} className="bg-[#F5F5F0]">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 rounded-lg h-fit">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{kpi.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transformations Lists */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Strategic Transformations */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Transformations alignées à vos objectifs
            <Target className="h-5 w-5 text-primary" />
          </h2>
          <div className="grid gap-4">
            {strategicTransformations.map((transform) => (
              <Card 
                key={transform.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => navigate(`/transformation/${transform.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <transform.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{transform.title}</CardTitle>
                          <Badge variant="secondary" className="ml-2">
                            <Target className="h-3 w-3 mr-1" />
                            Stratégique
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{transform.shortDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {transform.kpis.margin} €/ha
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Marge semi-nette
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Non-Strategic Transformations */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Autres transformations disponibles
          </h2>
          <div className="grid gap-4">
            {nonStrategicTransformations.map((transform) => (
              <Card 
                key={transform.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => navigate(`/transformation/${transform.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <transform.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{transform.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{transform.shortDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {transform.kpis.margin} €/ha
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Marge semi-nette
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}