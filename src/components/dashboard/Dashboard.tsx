import React, { useState } from 'react';
import { UpcomingDeclarations } from './UpcomingDeclarations';
import { PublicDeclarations } from './declarations/PublicDeclarations';
import { PrivateDeclarations } from './declarations/PrivateDeclarations';
import { useAuth } from '../../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Dashboard() {
  const { email } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
              <p className="mt-2 text-gray-600">
                Bienvenue, {email?.split('@')[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <UpcomingDeclarations />
        </div>

        <Tabs defaultValue="public" className="space-y-6">
          <TabsList>
            <TabsTrigger value="public">Déclarations Publiques</TabsTrigger>
            <TabsTrigger value="private">Déclarations Privées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="public">
            <PublicDeclarations
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </TabsContent>
          
          <TabsContent value="private">
            <PrivateDeclarations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}