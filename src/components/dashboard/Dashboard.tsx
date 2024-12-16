import React, { useState } from 'react';
import { UpcomingDeclarations } from './UpcomingDeclarations';
import { PublicDeclarations } from './declarations/PublicDeclarations';
import { PrivateDeclarations } from './declarations/PrivateDeclarations';
import { FilingRequirementsChart } from './declarations/FilingRequirementsChart';
import { Overview } from './Overview';
import { useAuth } from '../../context/AuthContext';
import { ChevronRight } from 'lucide-react';

const declarations = [
  {
    id: 1,
    title: "Déclarations Générales",
    description: "Documents essentiels pour vos opérations agricoles",
    progress: 40,
    status: "En cours de completion",
    actionRequired: true
  },
  {
    id: 2,
    title: "Aides et Subventions PAC",
    description: "Gestion des aides de la Politique Agricole Commune",
    progress: 62,
    status: "En cours de completion"
  },
  {
    id: 3,
    title: "Déclarations Environnementales",
    description: "Conformité environnementale et développement durable",
    progress: 37,
    status: "En cours de completion",
    actionRequired: true
  },
  {
    id: 4,
    title: "Élevage et Bien-être Animal",
    description: "Gestion et suivi du cheptel",
    progress: 55,
    status: "En cours de completion"
  }
];

export function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('public');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="p-8">
      {/* Header Section with Overview and Échéances à Venir */}
      <div className="grid grid-cols-[1fr_400px] gap-8 mb-8">
        <div className="space-y-4">
          <h1 className="text-[40px] font-bold text-black mb-1">Conformité</h1>
          <Overview />
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