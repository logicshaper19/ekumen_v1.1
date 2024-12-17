import { Euro, TrendingUp, Wallet } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export function FinancesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Résumé Financier</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Euro className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Chiffre d'Affaires</p>
                <p className="text-sm text-gray-600">450,000 €</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Marge Brute</p>
                <p className="text-sm text-gray-600">180,000 € (40%)</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Croissance Annuelle</p>
                <p className="text-sm text-gray-600">+12% vs. 2023</p>
              </div>
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
                <p className="text-sm font-medium">40%</p>
              </div>
              <Progress value={80} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-gray-600">
                <span>Objectif: 45%</span>
                <span>+5% vs. 2023</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Investissements</p>
                  <p className="text-sm text-gray-600">Modernisation des équipements</p>
                </div>
                <p className="text-sm font-medium">75,000 €</p>
              </div>
              <Progress value={50} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-gray-600">
                <span>Budget: 150,000 €</span>
                <span>50% utilisé</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Trésorerie</p>
                  <p className="text-sm text-gray-600">Fonds de roulement</p>
                </div>
                <p className="text-sm font-medium">90,000 €</p>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-gray-600">
                <span>Objectif: 120,000 €</span>
                <span>75% atteint</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
