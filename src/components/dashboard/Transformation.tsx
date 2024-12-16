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
    title: string
    value: string
    icon: any
  }[]
  steps: string[]
}

export const strategicTransformations: TransformationData[] = [
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
    kpis: [
      {
        title: "Réduction coûts",
        value: "25%",
        icon: Coins
      },
      {
        title: "Réseau",
        value: "50+",
        icon: Users
      },
      {
        title: "ROI estimé",
        value: "1 an",
        icon: Clock
      }
    ],
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
    shortDesc: "Optimisation des ressources par la technologie",
    description:
      "L'agriculture de précision utilise les technologies modernes pour optimiser l'utilisation des ressources. Elle permet une gestion plus fine des parcelles grâce aux données collectées.",
    benefits: [
      "Optimisation des intrants",
      "Réduction des coûts opérationnels",
      "Meilleure traçabilité",
      "Gestion précise des parcelles",
      "Amélioration des rendements"
    ],
    kpis: [
      {
        title: "Économie d'intrants",
        value: "15%",
        icon: Coins
      },
      {
        title: "Gain productivité",
        value: "+10%",
        icon: TrendingUp
      },
      {
        title: "ROI estimé",
        value: "3 ans",
        icon: Clock
      }
    ],
    steps: [
      "Cartographier les parcelles",
      "Installer les capteurs",
      "Former les équipes",
      "Mettre en place le suivi",
      "Analyser les données"
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
    kpis: [
      {
        title: "Économie énergie",
        value: "40%",
        icon: Zap
      },
      {
        title: "Production solaire",
        value: "50kW",
        icon: Sun
      },
      {
        title: "Amortissement",
        value: "8 ans",
        icon: Clock
      }
    ],
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
    kpis: [
      {
        title: "Productivité",
        value: "+20%",
        icon: TrendingUp
      },
      {
        title: "Précision",
        value: "95%",
        icon: Target
      },
      {
        title: "Données/jour",
        value: "2.5GB",
        icon: Cloud
      }
    ],
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
    title: "Mise en œuvre",
    value: "2-3 ans",
    icon: Clock,
    description: "Pour une transformation complète"
  },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                          {transform.kpis[0].value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transform.kpis[0].title}
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
                          {transform.kpis[0].value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transform.kpis[0].title}
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