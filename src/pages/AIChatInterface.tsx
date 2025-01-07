import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  MessageSquare, 
  AlertTriangle,
  TrendingUp,
  Users,
  ArrowRight
} from 'lucide-react'
import { QuickView } from '@/components/dashboard/QuickView'
import { ChatResponse } from '@/components/responses/ChatResponse'

// Structured suggestions based on different contexts
const contextualSuggestions = {
  risks: [
    {
      question: "Quels sont les principaux risques de dégradation des sols ?",
      context: "Environnemental",
      path: "/business-plan/risks-opportunities",
      description: "Découvrez les risques liés à la fertilité des sols et les stratégies d'atténuation"
    },
    {
      question: "Comment puis-je me protéger contre les impacts du changement climatique ?",
      context: "Climat",
      path: "/business-plan/risks-opportunities",
      description: "Comprendre les risques climatiques et les options d'assurance"
    },
    {
      question: "Quels sont les risques de volatilité des prix du marché ?",
      context: "Financier",
      path: "/business-plan/risks-opportunities",
      description: "Analyser les risques du marché et les stratégies de stabilisation des prix"
    }
  ],
  opportunities: [
    {
      question: "Comment puis-je bénéficier de la croissance du marché bio ?",
      context: "Marché",
      path: "/business-plan/risks-opportunities",
      description: "Explorez les opportunités du marché bio et la certification"
    },
    {
      question: "Quelles technologies d'agriculture de précision devrais-je adopter ?",
      context: "Innovation",
      path: "/business-plan/risks-opportunities",
      description: "Découvrez les nouvelles technologies agricoles et leurs avantages"
    },
    {
      question: "Comment développer des circuits de distribution locaux ?",
      context: "Distribution",
      path: "/business-plan/risks-opportunities",
      description: "Découvrez les opportunités du marché local et les stratégies"
    }
  ],
  partners: [
    {
      question: "Comment la Chambre d'Agriculture peut-elle aider mon exploitation ?",
      context: "Support",
      path: "/messagerie",
      description: "Connectez-vous avec des conseillers et experts agricoles"
    },
    {
      question: "Quelles options d'assurance sont disponibles ?",
      context: "Protection",
      path: "/business-plan/risks-opportunities",
      description: "Explorez les solutions d'assurance et de gestion des risques"
    },
    {
      question: "Comment accéder au financement agricole ?",
      context: "Financier",
      path: "/business-plan/financial-plan-details",
      description: "Découvrez les options de financement et les solutions de crédit"
    }
  ]
}

export default function AIChatInterface() {
  const [query, setQuery] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const [activeContext, setActiveContext] = useState<'risks' | 'opportunities' | 'partners'>('risks')
  const navigate = useNavigate()

  // Mock LLM response - in reality, this would come from your backend
  const mockResponse = {
    title: "Prix de l'Orge - Analyse de Marché",
    content: {
      sections: [
        {
          title: "Prix Actuels du Marché",
          type: 'text' as const,
          content: `D'après les dernières données de marché que j'ai recueillies (à la date d'aujourd'hui), voici les prix actuels pour l'orge:

Orge fourragère:
• États-Unis : 220 à 240 euros par tonne métrique
• Canada : 210 à 230 euros par tonne métrique
• Union européenne : 250 à 270 euros par tonne métrique`
        },
        {
          title: "Prix prévisionnels",
          type: 'text' as const,
          content: `Compte tenu des tendances actuelles du marché, voici les prévisions:

• Orge fourragère : Augmentation prévue de 3-5%
• Orge de brasserie : Stabilité ou légère hausse de 1-2%`
        },
        {
          title: "Facteurs d'influence",
          type: 'list' as const,
          content: [
            { label: "Offre mondiale", value: "Conditions météorologiques défavorables dans certaines régions" },
            { label: "Demande", value: "Forte demande du secteur de l'élevage" },
            { label: "Transport", value: "Coûts logistiques en hausse" }
          ]
        }
      ]
    },
    actions: [
      {
        label: "Voir l'analyse complète",
        onClick: () => navigate('/market-analysis')
      }
    ]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setShowResponse(true)
    }
    setQuery('')
  }

  const handleSuggestionClick = (path: string, question: string) => {
    setQuery(question)
    navigate(path)
  }

  if (showResponse) {
    return <ChatResponse 
      response={mockResponse} 
      onBack={() => setShowResponse(false)} 
    />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <MessageSquare className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-semibold">Assistant Ekumen</span>
            </div>
            <Button
              onClick={() => navigate('/tableau-de-bord')}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Accéder au Tableau de Bord
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Chat Section (2/3) */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-full" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Bienvenue sur Ekumen
            </h1>
            <p className="text-xl text-muted-foreground">
              Comment puis-je vous aider aujourd'hui ?
            </p>
          </div>

          {/* Context Selector */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeContext === 'risks' ? 'default' : 'outline'}
              onClick={() => setActiveContext('risks')}
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Risques
            </Button>
            <Button
              variant={activeContext === 'opportunities' ? 'default' : 'outline'}
              onClick={() => setActiveContext('opportunities')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Opportunités
            </Button>
            <Button
              variant={activeContext === 'partners' ? 'default' : 'outline'}
              onClick={() => setActiveContext('partners')}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Partenaires
            </Button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8 px-4">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1"
              />
              <Button type="submit">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Contextual Suggestions */}
          <div className="grid grid-cols-1 gap-4">
            {contextualSuggestions[activeContext].map((suggestion, index) => (
              <Card 
                key={index}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSuggestionClick(suggestion.path, suggestion.question)}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                      {activeContext === 'risks' && <AlertTriangle className="h-5 w-5" />}
                      {activeContext === 'opportunities' && <TrendingUp className="h-5 w-5" />}
                      {activeContext === 'partners' && <Users className="h-5 w-5" />}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{suggestion.question}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {suggestion.context}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick View Sidebar (1/3) */}
        <div className="w-1/3 min-w-[300px] bg-muted/30 rounded-lg p-6">
          <QuickView />
        </div>
      </div>
    </div>
  )
}
