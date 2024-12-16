import React, { useState } from 'react';
import { UpcomingDeclarations } from '../components/dashboard/UpcomingDeclarations';
import { PublicDeclarations } from '../components/dashboard/declarations/PublicDeclarations';
import { PrivateDeclarations } from '../components/dashboard/declarations/PrivateDeclarations';
import { FilingRequirementsChart } from '../components/dashboard/declarations/FilingRequirementsChart';

export function Conformite() {
  const [activeTab, setActiveTab] = useState('public');

  return (
    <div className="p-8">
      <h1 className="text-[40px] font-bold text-black mb-6">Conformité</h1>
      
      <div className="grid grid-cols-[1fr_400px] gap-8 mb-8">
        <div className="space-y-4">
          <FilingRequirementsChart />
        </div>
        <UpcomingDeclarations />
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveTab('public')}
          className={`px-6 py-2 rounded-full text-sm ${
            activeTab === 'public'
              ? 'bg-[#005E5D] text-white'
              : 'bg-white text-gray-900'
          }`}
        >
          Déclarations Publiques
        </button>
        <button
          onClick={() => setActiveTab('private')}
          className={`px-6 py-2 rounded-full text-sm ${
            activeTab === 'private'
              ? 'bg-[#005E5D] text-white'
              : 'bg-white text-gray-900'
          }`}
        >
          Déclarations Privées
        </button>
      </div>

      {/* Main Content */}
      <div>
        {activeTab === 'public' ? (
          <PublicDeclarations />
        ) : (
          <PrivateDeclarations />
        )}
      </div>
    </div>
  );
}
