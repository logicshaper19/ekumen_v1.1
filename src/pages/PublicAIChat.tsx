import { useState, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { 
  MessageSquare, 
  ArrowRight,
  LogIn,
  LayoutDashboard,
  Plus,
  Clock,
  Trash2
} from 'lucide-react'

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export function PublicAIChat() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
  }>>([])
  const navigate = useNavigate()

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Check for specific queries
      const normalizedQuery = query.toLowerCase();
      if (normalizedQuery.includes('prix') && normalizedQuery.includes('orge')) {
        navigate('/query-result', { 
          state: { 
            query,
            analysisType: 'market'
          }
        });
      } else if (normalizedQuery.includes('risque')) {
        navigate('/query-result', { 
          state: { 
            query,
            analysisType: 'risks'
          }
        });
      } else if (normalizedQuery.includes('support') || normalizedQuery.includes('conseil')) {
        navigate('/query-result', { 
          state: { 
            query,
            analysisType: 'support'
          }
        });
      }
      setQuery('');
    }
  }, [query, navigate])

  const handleFeatureClick = (feature: string) => {
    let query = '';
    switch (feature) {
      case 'market':
        query = "Obtenez des insights sur les prix et tendances du marché agricole";
        break;
      case 'risks':
        query = "Gestion des Risques - Identifiez et gérez les risques liés à votre exploitation";
        break;
      case 'support':
        query = "Support Personnalisé - Accédez à des conseils adaptés à votre situation";
        break;
    }
    
    if (query) {
      navigate('/query-result', { 
        state: { 
          query,
          analysisType: feature 
        }
      });
    }
  }

  const clearChat = () => {
    setMessages([])
    setQuery("")
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Top Navigation */}
      <div className="border-b border-[#004D40]/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <MessageSquare className="h-6 w-6 text-[#004D40]" />
              <span className="text-xl font-semibold text-[#004D40]">Ekumen</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/landing')}
                className="flex items-center gap-2 text-[#004D40] hover:bg-[#004D40]/5"
              >
                <LayoutDashboard className="h-4 w-4" />
                Site Traditionnel
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-[#004D40] text-[#FAF7F0] hover:bg-[#004D40]/90"
              >
                <LogIn className="h-4 w-4" />
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#004D40] rounded-full" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#004D40]">
              Bienvenue sur Ekumen
            </h1>
            <p className="text-xl text-[#004D40]/80">
              L'assistant intelligent pour les agriculteurs
            </p>
          </div>

          {/* Messages with Clear Chat Button */}
          <div className="relative">
            {messages.length > 0 && (
              <div className="absolute top-0 right-0 -mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-[#004D40] hover:bg-[#004D40]/5 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Effacer la conversation</span>
                </Button>
              </div>
            )}
            <div className="space-y-4 mb-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-[#004D40] text-[#FAF7F0]'
                        : 'bg-[#004D40]/5 text-[#004D40]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="whitespace-pre-line">{message.content}</p>
                      <div className="flex items-center gap-1 text-xs opacity-70 shrink-0 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(message.timestamp)}</span>
                      </div>
                    </div>
                    {message.role === 'assistant' && (
                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => navigate('/signup')}
                          className="bg-[#004D40] text-[#FAF7F0] hover:bg-[#004D40]/90"
                        >
                          Créer un compte
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate('/login')}
                          className="border-[#004D40] text-[#004D40] hover:bg-[#004D40]/5"
                        >
                          Se connecter
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 h-12 px-4 text-base border border-[#004D40]/20 focus:border-[#004D40] focus:ring-0 text-[#004D40] placeholder-[#004D40]/50 rounded-lg"
              />
              <Button 
                type="submit" 
                size="lg" 
                className="shrink-0 bg-[#004D40] text-[#FAF7F0] hover:bg-[#004D40]/90 disabled:bg-[#004D40]/50"
                disabled={!query.trim()}
              >
                <span className="mr-2">Envoyer</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <button
              onClick={() => handleFeatureClick("market")}
              className="text-center space-y-2 p-6 rounded-lg hover:bg-[#004D40]/5 transition-colors group"
            >
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-semibold text-[#004D40]">Analyse de Marché</h3>
                <Plus className="h-4 w-4 text-[#004D40] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-[#004D40]/70">
                Obtenez des insights sur les prix et tendances du marché agricole
              </p>
            </button>
            <button
              onClick={() => handleFeatureClick("risks")}
              className="text-center space-y-2 p-6 rounded-lg hover:bg-[#004D40]/5 transition-colors group"
            >
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-semibold text-[#004D40]">Gestion des Risques</h3>
                <Plus className="h-4 w-4 text-[#004D40] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-[#004D40]/70">
                Identifiez et gérez les risques liés à votre exploitation
              </p>
            </button>
            <button
              onClick={() => handleFeatureClick("support")}
              className="text-center space-y-2 p-6 rounded-lg hover:bg-[#004D40]/5 transition-colors group"
            >
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-semibold text-[#004D40]">Support Personnalisé</h3>
                <Plus className="h-4 w-4 text-[#004D40] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-[#004D40]/70">
                Accédez à des conseils adaptés à votre situation
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
