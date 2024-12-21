import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function TransformationChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Bonjour! Je suis votre assistant en transformation agricole. Comment puis-je vous aider?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        type: 'bot',
        content: getBotResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInput('');
  };

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('bio') || lowerQuestion.includes('biologique')) {
      return 'La conversion en agriculture biologique est un processus qui prend généralement 2-3 ans. Les principaux avantages sont une meilleure valorisation des produits et un impact environnemental réduit. Je peux vous donner plus de détails sur les étapes de conversion si vous le souhaitez.';
    }
    
    if (lowerQuestion.includes('précision') || lowerQuestion.includes('technologie')) {
      return 'L\'agriculture de précision utilise des technologies comme les GPS, drones et capteurs pour optimiser vos pratiques. Cela permet de réduire les coûts d\'intrants de 15-30% en moyenne. Voulez-vous en savoir plus sur une technologie en particulier?';
    }
    
    if (lowerQuestion.includes('diversification')) {
      return 'La diversification des cultures permet de réduire les risques et d\'améliorer la rentabilité. Nous recommandons d\'introduire progressivement de nouvelles cultures en fonction de votre marché local et de vos conditions pédoclimatiques.';
    }
    
    return 'Je peux vous renseigner sur les différentes transformations possibles pour votre exploitation : agriculture biologique, agriculture de précision, diversification des cultures, etc. Quelle transformation vous intéresse ?';
  };

  return (
    <Card className="flex flex-col h-[calc(33vh)] border-t">
      <div className="p-4 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-semibold">Assistant Transformation</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'bot' && (
                <Bot className="h-6 w-6 text-blue-500" />
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
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
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

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
            placeholder="Posez votre question sur les transformations..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
