import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Droplets,
  Leaf,
  Factory,
  Euro,
  Store,
  CloudRain,
  Building2,
  Phone,
  Users,
  ChevronRight,
  CalendarClock,
  FileText,
  TrendingDown,
  Target
} from 'lucide-react';
import { PlotsMap } from "@/components/maps/PlotsMap";
import cn from 'classnames';
import { Card, CardContent } from "@/components/ui/card";

// Mock data - Replace with real data from your backend
const kpis = [
  {
    id: 1,
    name: "Revenu",
    value: "75.2K",
    unit: "€",
    target: "80K",
    trend: "+2.5%",
    trendDirection: 'up',
    status: 'warning',
    icon: Euro,
    description: "Revenu annuel",
    progress: 94,
    projectedValue: "78K",
    lastPeriod: "72K"
  },
  {
    id: 2,
    name: "Émissions CO²",
    value: "12.5",
    unit: "t/ha",
    target: "10",
    trend: "-5%",
    trendDirection: 'down',
    status: 'success',
    icon: Factory,
    description: "Émissions par hectare",
    progress: 80,
    projectedValue: "11",
    lastPeriod: "13.2"
  },
  {
    id: 3,
    name: "Consommation d'eau",
    value: "850",
    unit: "m³/ha",
    target: "800",
    trend: "-3%",
    trendDirection: 'down',
    status: 'warning',
    icon: Droplets,
    description: "Consommation par hectare",
    progress: 85,
    projectedValue: "820",
    lastPeriod: "875"
  }
];

interface KPICardProps {
  kpi: {
    name: string;
    value: string;
    unit: string;
    target: string;
    trend: string;
    trendDirection: 'up' | 'down';
    status: 'success' | 'warning';
    icon: any;
    description: string;
    progress: number;
    projectedValue: string;
    lastPeriod: string;
  };
}

function KPICard({ kpi }: KPICardProps) {
  const Icon = kpi.icon;
  const TrendIcon = kpi.trendDirection === 'up' ? TrendingUp : TrendingDown;
  const isPositiveTrend = 
    (kpi.name === "Revenu" && kpi.trendDirection === 'up') ||
    ((kpi.name === "Émissions CO²" || kpi.name === "Consommation d'eau") && kpi.trendDirection === 'down');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium">{kpi.name}</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {kpi.value}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {kpi.unit}
                </span>
              </span>
            </div>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm rounded-full px-2 py-1",
            isPositiveTrend ? "bg-teal-50 text-teal-700" : "bg-orange-50 text-orange-700"
          )}>
            <TrendIcon className="h-4 w-4" />
            {kpi.trend}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>Progression</span>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Objectif: {kpi.target}{kpi.unit}</span>
            </div>
          </div>
          <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                isPositiveTrend ? "bg-teal-600" : "bg-orange-500"
              )}
              style={{ width: `${kpi.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Période précédente</div>
            <div className="font-medium">{kpi.lastPeriod}{kpi.unit}</div>
          </div>
          <div>
            <div className="text-gray-500">Projection</div>
            <div className="font-medium">{kpi.projectedValue}{kpi.unit}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const objectives = [
  {
    id: 1,
    name: "Augmenter mon revenu",
    shortDesc: "+5% sur 5 ans",
    icon: Euro,
    target: 5,
    current: 2,
    unit: '%',
    status: 'warning'
  },
  {
    id: 2,
    name: "Émissions CO²",
    shortDesc: "-5% sur 5 ans",
    icon: Factory,
    target: 5,
    current: 2,
    unit: '%',
    status: 'warning'
  },
  {
    id: 3,
    name: "Consommation d'eau",
    shortDesc: "-5% sur 5 ans",
    icon: Droplets,
    target: 5,
    current: 1,
    unit: '%',
    status: 'warning'
  },
];

const risksAndOpportunities = [
  {
    id: 1,
    type: 'risk',
    title: "Augmentation des risques caniculaires",
    description: "7 jours supplémentaires par an au dessus de 35° d'ici à 2050",
    icon: CloudRain,
    severity: 'high'
  },
  {
    id: 2,
    type: 'risk',
    title: "Stress hydrique",
    description: "Baisse des précipitation de 5% pendant la période estivale d'ici à 2050",
    icon: Droplets,
    severity: 'medium'
  },
  {
    id: 3,
    type: 'opportunity',
    title: "Développement de la filière carotte dans votre région",
    description: "+10% de producteurs se sont lancés dans la production de carotte dans votre région",
    icon: Store,
    severity: 'medium'
  }
];

const conversations = [
  {
    id: 1,
    partner: {
      name: 'Marie Dubois',
      role: 'Banquier Agricole',
      organization: 'Crédit Agricole',
      icon: Building2,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    lastMessage: 'Votre dossier de financement pour le nouveau tracteur a été approuvé.',
    date: '2024-12-15T14:30:00'
  },
  {
    id: 2,
    partner: {
      name: 'Jean Martin',
      role: 'Conseiller Technique',
      organization: 'Chambre d\'Agriculture',
      icon: Users,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    lastMessage: 'Je passerai demain pour évaluer l\'état des cultures.',
    date: '2024-12-14T09:15:00'
  },
  {
    id: 3,
    partner: {
      name: 'Sophie Laurent',
      role: 'Responsable Coopérative',
      organization: 'Coopérative Agricole',
      icon: Phone,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    lastMessage: 'Nouveaux prix bio disponibles pour la prochaine saison. À discuter ensemble.',
    date: '2024-12-13T16:45:00'
  }
];

export function Overview() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>
        <p className="text-gray-600">Bonjour Guillaume</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Map and Strategic Objectives */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Farm Map Section - Takes up 2 columns */}
        <div className="col-span-2">
          <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
            <PlotsMap />
          </div>
        </div>

        {/* Strategic Objectives Section - Takes up 1 column */}
        <div className="col-span-1">
          <h2 className="text-lg font-semibold mb-4">Vos objectifs stratégiques</h2>
          <div className="space-y-6">
            {objectives.map((objective) => (
              <div key={objective.id} className="space-y-2">
                <h3 className="text-base">{objective.name}</h3>
                <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      objective.status === 'success' ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${(objective.current / objective.target) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  {objective.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                  <span>{objective.current} / {objective.target}{objective.unit}</span>
                </div>
              </div>
            ))}
            <Link 
              to="/business-plan"
              state={{ activeTab: 'strategy' }}
              className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#005E5D] text-sm font-medium text-white hover:bg-[#004948] transition-colors"
            >
              Voir les objectifs
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Risks/Opportunities (1/2) and Conversations (1/2) */}
      <div className="grid grid-cols-2 gap-6 mt-12">
        {/* Risks and Opportunities Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Risques & Opportunités</h2>
          <div className="space-y-4">
            {risksAndOpportunities.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-white border hover:bg-accent/5 transition-colors"
              >
                <div className="flex gap-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    item.type === 'risk' ? 'bg-red-50' : 'bg-teal-50'
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      item.type === 'risk' ? 'text-red-600' : 'text-teal-600'
                    )} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <Link 
              to="/business-plan"
              state={{ activeTab: 'risks' }}
              className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#005E5D] text-sm font-medium text-white hover:bg-[#004948] transition-colors"
            >
              Voir tous les risques
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Recent Conversations Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Conversations Récentes</h2>
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    conversation.partner.iconBg
                  )}>
                    <conversation.partner.icon className={cn(
                      "h-5 w-5",
                      conversation.partner.iconColor
                    )} />
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium">{conversation.partner.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(conversation.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{conversation.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <span>{conversation.partner.role}</span>
                      <span>•</span>
                      <span>{conversation.partner.organization}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link 
              to="/messagerie"
              className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#005E5D] text-sm font-medium text-white hover:bg-[#004948] transition-colors"
            >
              Voir toutes les conversations
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
