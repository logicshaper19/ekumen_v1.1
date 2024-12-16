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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { declarations } from '@/data/declarations';

// Mock data - Replace with real data from your backend
const objectives = [
  {
    id: 1,
    name: "Consommation d'eau",
    shortDesc: "-14% d'ici 2024",
    icon: Droplets,
    target: 14,
    current: 8,
    unit: '%'
  },
  {
    id: 2,
    name: "Surface Bio",
    shortDesc: "+25% de surface",
    icon: Leaf,
    target: 25,
    current: 20,
    unit: '%'
  },
  {
    id: 3,
    name: "Émissions CO2",
    shortDesc: "-30% d'ici 2025",
    icon: Factory,
    target: 30,
    current: 15,
    unit: '%'
  }
];

const risksAndOpportunities = [
  {
    id: 1,
    type: 'risk',
    title: 'Volatilité des prix des intrants',
    description: 'Augmentation prévue des coûts des fertilisants de 15% en 2024',
    icon: Euro,
    severity: 'high'
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Nouveau marché bio local',
    description: 'Ouverture d\'un marché bio à 15km avec forte demande',
    icon: Store,
    severity: 'medium'
  },
  {
    id: 3,
    type: 'risk',
    title: 'Stress hydrique',
    description: 'Risque de sécheresse pour la saison à venir',
    icon: CloudRain,
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
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
      </div>

      {/* Top Row: Farm Map (2/3) and Strategic Objectives (1/3) */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Farm Map Section - Takes up 2 columns */}
        <div className="col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Mes Parcelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="/images/plots-map.jpg" 
                  alt="Carte des parcelles"
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Objectives Section - Takes up 1 column */}
        <div className="col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Objectifs Stratégiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {objectives.map((objective) => (
                    <Card key={objective.id} className="bg-[#F5F5F0] hover:bg-[#F5F5F0]/90 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#005E5D] bg-opacity-10 rounded-lg">
                            <objective.icon className="h-5 w-5 text-[#005E5D]" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-900">
                              {objective.name}
                            </h3>
                            <p className="text-sm text-gray-600">{objective.shortDesc}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="relative">
                              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[#005E5D] rounded-full transition-all duration-500"
                                  style={{ 
                                    width: `${(objective.current / objective.target) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-baseline gap-1 min-w-[90px] justify-end">
                            <span className="text-lg font-bold text-[#005E5D]">
                              {objective.current}
                            </span>
                            <span className="text-sm text-gray-600">
                              / {objective.target} {objective.unit}
                            </span>
                          </div>
                        </div>

                        {(objective.current / objective.target) >= 0.9 ? (
                          <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-sm">
                            <CheckCircle className="h-4 w-4" />
                            <span>Presque atteint</span>
                          </div>
                        ) : (objective.current / objective.target) >= 0.6 ? (
                          <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full text-sm">
                            <TrendingUp className="h-4 w-4" />
                            <span>En bonne voie</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>À améliorer</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Link 
                    to="/business-plan"
                    state={{ activeTab: 'strategy' }}
                    className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#005E5D] text-sm font-medium text-white hover:bg-[#004948] transition-colors"
                  >
                    Explorer tous les objectifs
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row: Risks/Opportunities (1/2) and Conversations (1/2) */}
      <div className="grid grid-cols-2 gap-6">
        {/* Risks and Opportunities Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-red-500">Risques et Opportunités TEST</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Recent Conversations Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              Dernières Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
