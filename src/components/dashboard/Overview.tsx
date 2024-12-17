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
  FileText
} from 'lucide-react';
import { PlotsMap } from "@/components/maps/PlotsMap";
import cn from 'classnames';

// Mock data - Replace with real data from your backend
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

function GrainIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2c1.4 3.3 4.6 5.5 8 5.9-3.4.4-6.6 2.6-8 5.9-1.4-3.3-4.6-5.5-8-5.9 3.4-.4 6.6-2.6 8-5.9z" />
      <path d="M12 12c1.4 3.3 4.6 5.5 8 5.9-3.4.4-6.6 2.6-8 5.9-1.4-3.3-4.6-5.5-8-5.9 3.4-.4 6.6-2.6 8-5.9z" />
    </svg>
  );
}

export function Overview() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>
        <p className="text-gray-600">Bonjour Guillaume</p>
      </div>

      {/* Top Row: Farm Map (2/3) and Strategic Objectives (1/3) */}
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
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Risques et Opportunités</h2>
          </div>
          <div className="space-y-4">
            {risksAndOpportunities.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'risk' 
                        ? 'bg-red-50' 
                        : 'bg-green-50'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        item.type === 'risk'
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <span 
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            item.type === 'risk' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {item.type === 'risk' ? 'Risque' : 'Opportunité'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <Link 
              to="/business-plan"
              state={{ activeTab: 'risks' }}
              className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#005E5D] text-sm font-medium text-white hover:bg-[#004948] transition-colors"
            >
              Voir tous les risques et opportunités
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Recent Conversations Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Dernières Conversations</h2>
          </div>
          <div className="space-y-4">
            {conversations.map((conversation) => {
              const Icon = conversation.partner.icon;
              return (
                <div key={conversation.id} className="p-4 bg-white border rounded-lg hover:bg-gray-50">
                  <div className="flex gap-4">
                    <div className={`p-2 ${conversation.partner.iconBg} rounded-lg`}>
                      <Icon className={`h-5 w-5 ${conversation.partner.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{conversation.partner.name}</h4>
                          <p className="text-sm text-gray-600">
                            {conversation.partner.role} - {conversation.partner.organization}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(conversation.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <Link 
              to="/messagerie"
              className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#005E5D] text-sm font-medium text-white hover:bg-[#004948] transition-colors"
            >
              Voir toutes les conversations
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
