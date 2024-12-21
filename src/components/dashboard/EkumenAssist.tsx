import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, X } from 'lucide-react';

interface Message {
  type: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface EkumenAssistProps {
  onClose: () => void;
}

export function EkumenAssist({ onClose }: EkumenAssistProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      setMessages([{
        type: 'assistant',
        content: 'Que souhaitez-vous explorer sur votre exploitation aujourd\'hui?',
        timestamp: new Date()
      }]);
    }, 500);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getAssistantResponse(input);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const getAssistantResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('bio') || lowerQuestion.includes('biologique')) {
      return 'La conversion en agriculture biologique est une excellente opportunité. Voici les principaux aspects à considérer :\n\n' +
             '• Période de conversion : 2-3 ans\n' +
             '• Avantages : meilleurs prix de vente, impact environnemental positif\n' +
             '• Défis : gestion des adventices, adaptation des pratiques\n\n' +
             'Souhaitez-vous en savoir plus sur un aspect particulier ?';
    }
    
    if (lowerQuestion.includes('sol') || lowerQuestion.includes('terre')) {
      return 'La santé des sols est fondamentale. Voici quelques transformations possibles :\n\n' +
             '• Agriculture régénératrice\n' +
             '• Techniques culturales simplifiées\n' +
             '• Couverts végétaux\n\n' +
             'Quelle approche vous intéresse le plus ?';
    }
    
    if (lowerQuestion.includes('technologie') || lowerQuestion.includes('numérique')) {
      return 'Le numérique offre de nombreuses opportunités :\n\n' +
             '• Agriculture de précision\n' +
             '• Outils d\'aide à la décision\n' +
             '• Robotique agricole\n\n' +
             'Sur quel aspect souhaitez-vous plus d\'informations ?';
    }
    
    if (lowerQuestion.includes('diversification') || lowerQuestion.includes('culture')) {
      return 'La diversification est une excellente stratégie. Considérez :\n\n' +
             '• Nouvelles cultures à haute valeur ajoutée\n' +
             '• Rotation des cultures\n' +
             '• Circuits courts\n\n' +
             'Quelle option vous intéresse ?';
    }

    return 'Je peux vous aider sur plusieurs aspects de votre exploitation :\n\n' +
           '• Transition bio\n' +
           '• Santé des sols\n' +
           '• Technologies numériques\n' +
           '• Diversification\n\n' +
           'Quel sujet vous intéresse ?';
  };

  return (
    <Card className="flex flex-col h-screen border-l">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-teal-600" />
          <h3 className="font-semibold">Ekumen Assist</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <Bot className="h-6 w-6 text-teal-600 flex-shrink-0" />
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] whitespace-pre-wrap ${
                  message.type === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              {message.type === 'user' && (
                <User className="h-6 w-6 text-teal-600 flex-shrink-0" />
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <Bot className="h-6 w-6 text-teal-600" />
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1"
          />
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
