import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-[#FAF7F0] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-[#004D40] sm:text-6xl">
            L'intelligence artificielle au service de l'agriculture
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#004D40]/80">
            Optimisez votre exploitation agricole avec notre assistant IA spécialisé.
            Prenez des décisions éclairées basées sur des données en temps réel.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-[#004D40] text-[#FAF7F0] hover:bg-[#004D40]/90"
            >
              <Link to="/signup" className="flex items-center gap-2">
                Commencer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#004D40] text-[#004D40] hover:bg-[#004D40]/5"
            >
              <Link to="/use-cases">
                Découvrir les cas d'usage
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
