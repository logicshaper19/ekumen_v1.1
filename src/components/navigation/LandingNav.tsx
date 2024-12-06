import React from 'react';
import { Button } from '@/components/ui/button';

export function LandingNav() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center font-bold text-xl">
              Ekumen
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#how-it-works"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Comment ça marche ?
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Avantages
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <a href="/login">Se connecter</a>
            </Button>
            <Button asChild>
              <a href="/signup">S'inscrire</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}