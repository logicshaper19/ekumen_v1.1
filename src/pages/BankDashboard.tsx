import React from 'react';
import { PlotsMap } from '@/components/maps/PlotsMap';
import { ESGMetrics } from '@/components/dashboard/ESGMetrics';
import { FarmersDirectory } from '@/components/dashboard/FarmersDirectory';
import { RecentChats } from '@/components/dashboard/RecentChats';

export function BankDashboard() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold tracking-tight">Tableau de Bord Bancaire</h2>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-auto">
        {/* Map and ESG Section */}
        <section className="px-6">
          <div className="grid grid-cols-3 gap-6" style={{ height: '400px' }}>
            <div className="col-span-2 h-full">
              <PlotsMap />
            </div>
            <div className="col-span-1 h-full">
              <ESGMetrics />
            </div>
          </div>
        </section>

        {/* Farmers Directory and Recent Chats */}
        <section className="px-6 pb-6 mt-24">
          <div className="grid grid-cols-3 gap-6">
            {/* Farmers Directory - Takes 2 columns */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-6">Répertoire des Agriculteurs</h3>
              <FarmersDirectory />
            </div>
            {/* Recent Chats - Takes 1 column to align with ESG metrics */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-6">Conversations Récentes</h3>
              <RecentChats />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
