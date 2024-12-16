import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  TrendingUp, 
  Factory, 
  Database,
  LogOut 
} from 'lucide-react';

const navigation = [
  { name: 'Tableau de Bord', href: '/tableau-de-bord', icon: LayoutDashboard },
  { name: 'Réglementations', href: '/reglementations', icon: FileText },
  { name: 'Business Plan', href: '/business-plan', icon: TrendingUp },
  { name: 'Transformation', href: '/transformation', icon: Factory },
  { name: 'Messagerie', href: '/messagerie', icon: Users },
  { name: 'Mes Données', href: '/mes-donnees', icon: Database },
];

export function MainNav() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isLinkActive = (href: string) => {
    if (href === '/dashboard' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50 sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-gray-900">
                Ekumen
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isLinkActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium
                      ${isActive 
                        ? 'border-b-2 border-black text-gray-900' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {user?.firstName} {user?.lastName}
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 text-base font-medium
                  ${isActive
                    ? 'bg-gray-50 border-l-4 border-black text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}