import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator.tsx';
import { Building2, Wheat, Euro, Scale, Coins, Tractor, Droplet } from 'lucide-react';
import { AnalyticsCard } from '@/components/ui/analytics-card';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Visualisez les indicateurs clés de performance de votre exploitation agricole, y compris les revenus, les rendements et les coûts opérationnels.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Revenu Annuel"
          value="12 500 €"
          description="par rapport au mois dernier"
          change="+8.2%"
          trend="up"
          icon={Euro}
        />

        <AnalyticsCard
          title="Marge Semi Net"
          value="7.2 t/ha"
          description="toutes cultures confondues"
          change="+2.1%"
          trend="up"
          icon={Scale}
        />

        <AnalyticsCard
          title="Revenu Annuel"
          value="4 200 €"
          description="réduction des dépenses"
          change="-3.1%"
          trend="down"
          icon={Coins}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Informations Clés</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Surface Totale</p>
                <p className="text-sm text-gray-600">85 hectares</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wheat className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Têtes de Rotation</p>
                <p className="text-sm text-gray-600">Blé, Maïs, Colza</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tractor className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Équipement</p>
                <p className="text-sm text-gray-600">12 machines agricoles</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Droplet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Irrigation</p>
                <p className="text-sm text-gray-600">65% de la surface totale</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Objectifs Annuels</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Rendement</span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Réduction des Coûts</span>
                <span className="text-sm text-gray-600">60%</span>
              </div>
              <Progress value={60} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Certification Bio</span>
                <span className="text-sm text-gray-600">40%</span>
              </div>
              <Progress value={40} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Innovation Technique</span>
                <span className="text-sm text-gray-600">85%</span>
              </div>
              <Progress value={85} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
