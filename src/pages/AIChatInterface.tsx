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
  Users
} from 'lucide-react'
import { QuickView } from '@/components/dashboard/QuickView'

// Structured suggestions based on different contexts
const contextualSuggestions = {
  risks: [
    {
      question: "What are the main risks for soil degradation?",
      context: "Environmental",
      path: "/business-plan/risks-opportunities",
      description: "Learn about soil fertility risks and mitigation strategies"
    },
    {
      question: "How can I protect against climate change impacts?",
      context: "Climate",
      path: "/business-plan/risks-opportunities",
      description: "Understand climate risks and insurance options"
    },
    {
      question: "What are the market price volatility risks?",
      context: "Financial",
      path: "/business-plan/risks-opportunities",
      description: "Analyze market risks and price stabilization strategies"
    }
  ],
  opportunities: [
    {
      question: "How can I benefit from the organic market growth?",
      context: "Market",
      path: "/business-plan/risks-opportunities",
      description: "Explore organic market opportunities and certification"
    },
    {
      question: "What precision farming technologies should I adopt?",
      context: "Innovation",
      path: "/business-plan/risks-opportunities",
      description: "Discover new agricultural technologies and their benefits"
    },
    {
      question: "How to develop local distribution channels?",
      context: "Distribution",
      path: "/business-plan/risks-opportunities",
      description: "Learn about local market opportunities and strategies"
    }
  ],
  partners: [
    {
      question: "How can the Chamber of Agriculture help my farm?",
      context: "Support",
      path: "/messagerie",
      description: "Connect with agricultural advisors and experts"
    },
    {
      question: "What insurance options are available?",
      context: "Protection",
      path: "/business-plan/risks-opportunities",
      description: "Explore insurance and risk management solutions"
    },
    {
      question: "How can I access agricultural financing?",
      context: "Financial",
      path: "/business-plan/financial-plan-details",
      description: "Learn about financing options and credit solutions"
    }
  ]
}

export function AIChatInterface() {
  const [query, setQuery] = useState("")
  const [activeContext, setActiveContext] = useState<'risks' | 'opportunities' | 'partners'>('risks')
  const navigate = useNavigate()

  const handleSuggestionClick = (path: string, question: string) => {
    setQuery(question)
    // Navigate to the dashboard page
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Top Bar */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Ekumen AI Assistant</span>
            </div>
            <Button
              onClick={() => navigate('/tableau-de-bord')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to Main Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Chat Section (2/3) */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-full" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to Ekumen
            </h1>
            <p className="text-xl text-muted-foreground">
              How can I help you get started today?
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
              Risks
            </Button>
            <Button
              variant={activeContext === 'opportunities' ? 'default' : 'outline'}
              onClick={() => setActiveContext('opportunities')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Opportunities
            </Button>
            <Button
              variant={activeContext === 'partners' ? 'default' : 'outline'}
              onClick={() => setActiveContext('partners')}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Partners
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <Input
              className="w-full h-14 pl-4 pr-12 text-lg"
              placeholder="Ask me anything about your farm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              className="absolute right-2 top-2"
              size="icon"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>

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
