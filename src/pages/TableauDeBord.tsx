import React from 'react';
import { Overview } from '../components/dashboard/Overview';

export function TableauDeBord() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Tableau de Bord</h1>
      </div>

      {/* Rest of your dashboard content */}
      <div className="max-w-7xl mx-auto">
        <Overview />
      </div>
    </div>
  );
}
