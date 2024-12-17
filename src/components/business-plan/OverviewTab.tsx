import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator.tsx';
import { Building2, Wheat, Euro, Scale, Coins, Tractor, Droplet } from 'lucide-react';
import { AnalyticsCard } from '@/components/ui/analytics-card';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Revenu Mensuel"
          value="12 500 €"
          subtitle="par rapport au mois dernier"
          change={{ value: "+8.2%", trend: "up" }}
          icon={Euro}
        />

        <AnalyticsCard
          title="Rendement Moyen"
          value="7.2 t/ha"
          subtitle="toutes cultures confondues"
          change={{ value: "+2.1%", trend: "up" }}
          icon={Scale}
        />

        <AnalyticsCard
          title="Coûts Opérationnels"
          value="4 200 €"
          subtitle="réduction des dépenses"
          change={{ value: "-3.1%", trend: "down" }}
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
                <p className="text-sm font-medium leading-none">Cultures Principales</p>
                <p className="text-sm text-gray-600">Blé, Maïs, Tournesol</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tractor className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Type d'Agriculture</p>
                <p className="text-sm text-gray-600">Conventionnelle</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F5F5F0] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Objectifs 2024-2027</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Rendement</p>
                  <p className="text-sm text-gray-600">Augmenter la productivité des cultures</p>
                </div>
                <p className="text-sm font-medium">8%</p>
              </div>
              <Progress value={53} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-gray-600">
                <span>Objectif: 15%</span>
                <span>+8% depuis janvier</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Surface Bio</p>
                  <p className="text-sm text-gray-600">Conversion en agriculture biologique</p>
                </div>
                <p className="text-sm font-medium">12ha</p>
              </div>
              <Progress value={60} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-gray-600">
                <span>Objectif: 20ha</span>
                <span>En conversion</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Économie d'Eau</p>
                  <p className="text-sm text-gray-600">Réduire la consommation d'eau</p>
                </div>
                <p className="text-sm font-medium">13%</p>
              </div>
              <Progress value={65} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-gray-600">
                <span>Objectif: 20%</span>
                <span>vs. 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
