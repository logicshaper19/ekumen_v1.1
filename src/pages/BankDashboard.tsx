import React from 'react';
import { PlotsMap } from '@/components/maps/PlotsMap';
import { ESGMetrics } from '@/components/dashboard/ESGMetrics';
import { FarmersDirectory } from '@/components/dashboard/FarmersDirectory';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { useAuth } from '@/context/AuthContext';
import { MapPin } from 'lucide-react';

export function BankDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-800">Bonjour Guillaume,</h3>
        <h3 className="text-xl font-medium text-gray-800">
          Voici ce qui se passe dans votre portefeuille
        </h3>
      </div>

      {/* Top Row: Farm Map (2/3) and ESG Metrics (1/3) */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Farm Map Section - Takes up 2 columns */}
        <div className="col-span-2">
          <div className="h-[calc(3*11rem)] bg-gray-100 rounded-lg overflow-hidden">
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
