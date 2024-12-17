import { Euro, TrendingUp, Wallet, PiggyBank, Target, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AnalyticsCard } from '@/components/ui/analytics-card';

export function FinancesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Chiffre d'Affaires"
          value="450 000 €"
          subtitle="Année en cours"
          change={{ value: "+12%", trend: "up" }}
          icon={Euro}
        />

        <AnalyticsCard
          title="Marge Brute"
          value="180 000 €"
          subtitle="40% du CA"
          change={{ value: "+5%", trend: "up" }}
          icon={PiggyBank}
        />

        <AnalyticsCard
          title="Objectif 2024"
          value="500 000 €"
          subtitle="de chiffre d'affaires"
          change={{ value: "+11%", trend: "up" }}
          icon={Target}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Répartition des Revenus</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Cultures Principales</p>
                  <p className="text-sm text-gray-600">65% du CA total</p>
                </div>
                <p className="text-sm font-medium">292 500 €</p>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Cultures Secondaires</p>
                  <p className="text-sm text-gray-600">25% du CA total</p>
                </div>
                <p className="text-sm font-medium">112 500 €</p>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Autres Revenus</p>
                  <p className="text-sm text-gray-600">10% du CA total</p>
                </div>
                <p className="text-sm font-medium">45 000 €</p>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </div>

        <div className="bg-[#F5F5F0] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Objectifs Financiers</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Marge Brute</p>
                  <p className="text-sm text-gray-600">Amélioration de la rentabilité</p>
                </div>
                <p className="text-sm font-medium">45%</p>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Réduction des Coûts</p>
                  <p className="text-sm text-gray-600">Optimisation des charges</p>
                </div>
                <p className="text-sm font-medium">-8%</p>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Investissements</p>
                  <p className="text-sm text-gray-600">Modernisation exploitation</p>
                </div>
                <p className="text-sm font-medium">75 000 €</p>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
