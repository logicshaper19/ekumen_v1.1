import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';

interface ChatResponseProps {
  response: {
    title: string;
    content: {
      sections: Array<{
        title: string;
        content: string | Array<{label: string; value: string}>;
        type?: 'text' | 'list';
      }>;
    };
    actions?: Array<{
      label: string;
      onClick: () => void;
    }>;
  };
  onBack: () => void;
}

export function ChatResponse({ response, onBack }: ChatResponseProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-xl font-semibold">Assistant Ekumen</span>
          </div>
        </div>
      </div>

      {/* Response Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-6">{response.title}</h2>

          {response.content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold mt-8 mb-4">{section.title}</h3>
              
              {section.type === 'list' ? (
                <div className="space-y-4">
                  {(section.content as Array<{label: string; value: string}>).map((item, i) => (
                    <div key={i}>
                      <h4 className="font-semibold mb-1">{item.label}</h4>
                      <p className="text-gray-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content as string}
                </div>
              )}
            </div>
          ))}
        </div>

        {response.actions && (
          <div className="flex justify-center gap-4 mt-8">
            {response.actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={index === response.actions!.length - 1 ? "default" : "outline"}
                className="w-32"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
