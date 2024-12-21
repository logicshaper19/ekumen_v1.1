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
  Sun,
  LineChart
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface TransformationData {
  id: string
  title: string
  shortDesc: string
  description: string
  icon: any
  source: 'Chambre d\'Agriculture' | 'MaeLabs' | 'INRAE' | 'ADEME'
  type: 'Stratégique' | 'Opérationnel'
  impact: 'Fort' | 'Moyen' | 'Faible'
  status: 'new' | 'ongoing' | 'under-review' | 'under-consideration'
  objectives: {
    label: string;
    color: 'green' | 'blue' | 'yellow' | 'purple';
  }[];
  reviewer?: {
    name: string
    organization: string
    since: string
  }
  benefits: string[]
  kpis: {
    margin: number
    yield?: number
    carbon?: number
    workingTime?: number
    gesEmissions?: number
    lixiviation?: number
    n2oEmissions?: number
    soilQuality?: number
    organicMatter?: number
    biodiversity?: number
  }
  steps: string[]
}

export const strategicTransformations: TransformationData[] = [
  {
    id: 'regenerative-ag',
    title: 'Agriculture régénérative',
    shortDesc: 'Restaurer la santé des sols',
    description: 'Adoption de pratiques agricoles régénératives pour améliorer la santé des sols et la biodiversité.',
    icon: Sprout,
    source: 'INRAE',
    type: 'Stratégique',
    impact: 'Fort',
    status: 'new',
    objectives: [
      { label: 'Environnement', color: 'green' },
      { label: 'Rendement', color: 'blue' },
      { label: 'Résilience', color: 'yellow' }
    ],
    benefits: [
      'Amélioration de la structure du sol',
      'Augmentation de la biodiversité',
      'Réduction des intrants',
      'Meilleure rétention d\'eau'
    ],
    kpis: {
      margin: 250,
      yield: 15,
      carbon: -30,
      workingTime: 8.5,
      gesEmissions: 2.3,
      lixiviation: 15,
      n2oEmissions: 3.2,
      soilQuality: 8.5,
      organicMatter: 3.2,
      biodiversity: 75
    },
    steps: [
      'Analyse initiale des sols',
      'Formation aux pratiques régénératives',
      'Mise en place des couverts végétaux',
      'Suivi et ajustements'
    ]
  },
  {
    id: 'crop-diversification',
    title: 'Diversification des cultures',
    shortDesc: 'Optimiser la rotation des cultures',
    description: 'Diversifier les cultures pour optimiser l\'utilisation des ressources et réduire les risques.',
    icon: Leaf,
    source: 'Chambre d\'Agriculture',
    type: 'Stratégique',
    impact: 'Moyen',
    status: 'ongoing',
    reviewer: {
      name: 'Jean Dupont',
      organization: 'INRAE',
      since: '2022-01-01'
    },
    objectives: [
      { label: 'Rentabilité', color: 'purple' },
      { label: 'Résilience', color: 'yellow' }
    ],
    benefits: [
      'Réduction des risques',
      'Amélioration de la fertilité',
      'Contrôle naturel des ravageurs',
      'Nouvelles sources de revenus'
    ],
    kpis: {
      margin: 180,
      yield: 10,
      workingTime: 7.2,
      gesEmissions: 1.8,
      lixiviation: 12,
      n2oEmissions: 2.8,
      soilQuality: 7.8,
      organicMatter: 2.8,
      biodiversity: 65
    },
    steps: [
      'Étude de marché',
      'Sélection des cultures',
      'Plan de rotation',
      'Mise en œuvre progressive'
    ]
  },
  {
    id: 'cooperative',
    title: 'Coopérative agricole',
    shortDesc: 'Mutualiser les ressources',
    description: 'Création d\'une coopérative pour mutualiser les ressources et réduire les coûts.',
    icon: Users,
    source: 'MaeLabs',
    type: 'Stratégique',
    impact: 'Fort',
    status: 'under-review',
    reviewer: {
      name: 'Marie Laurent',
      organization: 'Crédit Agricole',
      since: '2023-11-15'
    },
    objectives: [
      { label: 'Rentabilité', color: 'purple' },
      { label: 'Innovation', color: 'blue' }
    ],
    benefits: [
      'Économies d\'échelle sur les achats',
      'Meilleur pouvoir de négociation',
      'Partage d\'expérience et de matériel',
      'Accès à de nouveaux marchés',
      'Réduction des risques'
    ],
    kpis: {
      margin: 120,
      workingTime: 0,
      gesEmissions: 0,
      lixiviation: 0,
      n2oEmissions: 0,
      soilQuality: 0,
      organicMatter: 0,
      biodiversity: 0
    },
    steps: [
      'Identifier les partenaires potentiels',
      'Définir le modèle de gouvernance',
      'Établir les statuts',
      'Mettre en place la structure',
      'Développer les services communs'
    ]
  }
];

export const nonStrategicTransformations: TransformationData[] = [
  {
    id: 'precision-ag',
    title: 'Agriculture de précision',
    shortDesc: 'Optimiser l\'utilisation des intrants',
    description: 'Utilisation de technologies de précision pour optimiser l\'application d\'intrants.',
    icon: LineChart,
    source: 'ADEME',
    type: 'Opérationnel',
    impact: 'Moyen',
    status: 'under-review',
    reviewer: {
      name: 'Thomas Dubois',
      organization: 'Chambre d\'Agriculture',
      since: '2023-12-01'
    },
    objectives: [
      { label: 'Efficacité', color: 'blue' },
      { label: 'Environnement', color: 'green' }
    ],
    benefits: [
      'Réduction des coûts',
      'Optimisation des intrants',
      'Meilleure traçabilité',
      'Données précises pour la prise de décision'
    ],
    kpis: {
      margin: 150,
      yield: 8,
      workingTime: 0,
      gesEmissions: 0,
      lixiviation: 0,
      n2oEmissions: 0,
      soilQuality: 7.2,
      organicMatter: 0,
      biodiversity: 0
    },
    steps: [
      'Cartographie des parcelles',
      'Installation des capteurs',
      'Formation aux outils',
      'Analyse et optimisation'
    ]
  },
  {
    id: 'energy-transition',
    title: 'Transition énergétique',
    shortDesc: 'Vers l\'autonomie énergétique',
    description: 'Installation de panneaux solaires et optimisation de la consommation d\'énergie.',
    icon: Sun,
    source: 'ADEME',
    type: 'Opérationnel',
    impact: 'Moyen',
    status: 'ongoing',
    reviewer: {
      name: 'Pierre Martin',
      organization: 'ADEME',
      since: '2022-06-01'
    },
    objectives: [
      { label: 'Environnement', color: 'green' },
      { label: 'Rentabilité', color: 'purple' }
    ],
    benefits: [
      'Réduction des coûts énergétiques',
      'Indépendance énergétique',
      'Impact environnemental réduit',
      'Revenus complémentaires possibles',
      'Image positive'
    ],
    kpis: {
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
      'Audit énergétique',
      'Étude de faisabilité',
      'Installation des équipements',
      'Raccordement au réseau',
      'Suivi de la production'
    ]
  },
  {
    id: 'smart-farming',
    title: 'Smart Farming',
    shortDesc: 'Digitalisation des opérations',
    description: 'Adoption d\'outils numériques pour la gestion quotidienne de l\'exploitation.',
    icon: Tractor,
    source: 'MaeLabs',
    type: 'Opérationnel',
    impact: 'Faible',
    status: 'under-review',
    reviewer: {
      name: 'Sophie Martin',
      organization: 'Groupama',
      since: '2023-10-20'
    },
    objectives: [
      { label: 'Innovation', color: 'blue' },
      { label: 'Efficacité', color: 'yellow' }
    ],
    benefits: [
      'Optimisation des processus',
      'Prédiction des rendements',
      'Détection précoce des problèmes',
      'Réduction du gaspillage',
      'Traçabilité améliorée'
    ],
    kpis: {
      margin: 90,
      workingTime: 0,
      gesEmissions: 0,
      lixiviation: 0,
      n2oEmissions: 0,
      soilQuality: 0,
      organicMatter: 0,
      biodiversity: 0
    },
    steps: [
      'Déployer les capteurs IoT',
      'Configurer la plateforme cloud',
      'Former les équipes aux outils',
      'Intégrer les systèmes existants',
      'Mettre en place le monitoring'
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