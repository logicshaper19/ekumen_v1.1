import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Users, LogOut, BarChart3, Factory, Database } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { NavButton } from './NavButton';

export function MainNav() {
  const { logout } = useAuth();
  
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center font-bold text-xl">
              Ekumen
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavButton to="/dashboard/declarations" icon={FileText}>
                Déclarations
              </NavButton>
              <NavButton to="/dashboard/business-plan" icon={BarChart3}>
                Plan d'Exploitation
              </NavButton>
              <NavButton to="/dashboard/transformation" icon={Factory}>
                Transformation
              </NavButton>
              <NavButton to="/dashboard/my-data" icon={Database}>
                Mes Données
              </NavButton>
              <NavButton to="/dashboard/community" icon={Users}>
                Communauté
              </NavButton>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}