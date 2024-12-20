import React from 'react';
import { PlotsMap } from '@/components/maps/PlotsMap';
import { ESGMetrics } from '@/components/dashboard/ESGMetrics';
import { FarmersDirectory } from '@/components/dashboard/FarmersDirectory';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { useAuth } from '@/context/AuthContext';

export function BankDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Tableau de Bord Bancaire</h1>
        <p className="text-gray-600">
          Bonjour Guillaume
        </p>
      </div>

      {/* Top Row: Farm Map (2/3) and ESG Metrics (1/3) */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Farm Map Section - Takes up 2 columns */}
        <div className="col-span-2">
          <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
            <PlotsMap />
          </div>
        </div>

        {/* ESG Metrics Section - Takes up 1 column */}
        <div className="col-span-1">
          <h2 className="text-lg font-semibold mb-4">Indicateurs ESG</h2>
          <div className="h-full">
            <ESGMetrics />
          </div>
        </div>
      </div>

      {/* Bottom Row: Farmers Directory (1/2) and Recent Chats (1/2) */}
      <div className="grid grid-cols-2 gap-6 mt-12">
        {/* Farmers Directory Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Répertoire des Agriculteurs</h2>
          <FarmersDirectory maxItems={3} />
        </div>

        {/* Recent Chats Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Conversations Récentes</h2>
          <RecentChats maxItems={3} isBankDashboard={true} />
        </div>
      </div>
    </div>
  );
}
