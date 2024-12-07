import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  Factory,
  FolderOpen,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  {
    name: 'Déclarations',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    name: 'Business Plan',
    icon: TrendingUp,
    path: '/business-plan'
  },
  {
    name: 'Communauté',
    icon: Users,
    path: '/communaute'
  },
  {
    name: 'Transformation',
    icon: Factory,
    path: '/transformation'
  },
  {
    name: 'Mes Données',
    icon: FolderOpen,
    path: '/mes-donnees'
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">Ekumen</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-1">
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings className="w-5 h-5" />
              Paramètres
            </Link>
          </li>
          <li>
            <button
              onClick={() => {/* Add logout logic */}}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
