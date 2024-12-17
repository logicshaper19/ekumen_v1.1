import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Target, Leaf, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AnalyticsCard } from '@/components/ui/analytics-card';

export function StrategyTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Objectifs Atteints"
          value="75%"
          subtitle="8 sur 12 objectifs"
          change={{ value: "+25%", trend: "up" }}
          icon={Target}
        />
        <AnalyticsCard
          title="Impact Environnemental"
          value="-30%"
          subtitle="Réduction des intrants"
          change={{ value: "-10%", trend: "down" }}
          icon={Leaf}
        />
        <AnalyticsCard
          title="Innovations"
          value="5"
          subtitle="Nouvelles technologies"
          change={{ value: "+2", trend: "up" }}
          icon={Lightbulb}
        />
      </div>

      {/* Add Objective Button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => navigate('/business-plan/add-objective')}
          className="bg-teal-700 text-white hover:bg-teal-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter vos objectifs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stratégie d'Exploitation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Axes Stratégiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg hover:bg-accent/50 transition-colors">
                <div className="text-primary font-semibold mb-2">Diversification</div>
                <p className="text-sm text-gray-600">Introduction de nouvelles cultures à haute valeur ajoutée</p>
              </div>
              <div className="p-4 bg-white rounded-lg hover:bg-accent/50 transition-colors">
                <div className="text-primary font-semibold mb-2">Durabilité</div>
                <p className="text-sm text-gray-600">Transition vers des pratiques agricoles plus durables</p>
              </div>
              <div className="p-4 bg-white rounded-lg hover:bg-accent/50 transition-colors">
                <div className="text-primary font-semibold mb-2">Innovation</div>
                <p className="text-sm text-gray-600">Adoption de technologies agricoles de précision</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Plan d'Action</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">1</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium">Analyse du marché</h4>
                  <p className="text-sm text-gray-600 mt-1">Étude des tendances et opportunités du marché local</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">2</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium">Formation continue</h4>
                  <p className="text-sm text-gray-600 mt-1">Développement des compétences en agriculture durable</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">3</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium">Investissement technologique</h4>
                  <p className="text-sm text-gray-600 mt-1">Acquisition d'équipements de précision</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
