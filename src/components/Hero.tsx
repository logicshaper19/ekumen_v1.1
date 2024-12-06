import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-8 py-24 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center rounded-lg bg-black/5 px-3 py-1.5 text-sm font-medium">
              🌾 Simplifiez votre gestion agricole
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
              Automatisez Votre Administration Agricole.
            </h1>
            
            <p className="text-muted-foreground text-lg sm:text-xl">
              Ekumen automatise vos tâches administratives—des demandes de subventions aux rapports de conformité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <a href="/signup">Commencer</a>
              </Button>
            </div>
          </div>
          
          <div className="relative lg:ml-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="Beautiful farmland at sunset"
                className="aspect-[4/3] rounded-xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}