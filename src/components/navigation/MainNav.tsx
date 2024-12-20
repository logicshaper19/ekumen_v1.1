import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Factory, 
  Database,
  LogOut,
  ScrollText,
  Sprout,
  Building2,
  Wheat
} from 'lucide-react';

const navigation = [
  { name: 'Tableau de Bord', href: '/tableau-de-bord', icon: LayoutDashboard, role: 'farmer' },
  { name: 'Tableau de Bord', href: '/bank-dashboard', icon: Building2, role: 'bank' },
  { name: 'Agriculteurs', href: '/agriculteurs', icon: Wheat, role: 'bank' },
  { name: 'Réglementations', href: '/reglementations', icon: ScrollText, role: 'farmer' },
  { name: 'Business Plan', href: '/business-plan', icon: TrendingUp, role: 'farmer' },
  { name: 'Transformations', href: '/transformations', icon: Sprout, role: 'farmer' },
  { name: 'Messagerie', href: '/messagerie', icon: Users, role: 'all' },
  { name: 'Mes Données', href: '/my-data', icon: Database, role: 'farmer' },
];

export function MainNav() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isLinkActive = (href: string) => {
    // Special case for dashboard
    if (href === '/tableau-de-bord' && (location.pathname === '/' || location.pathname === '/tableau-de-bord')) {
      return true;
    }
    if (href === '/bank-dashboard' && location.pathname === '/bank-dashboard') {
      return true;
    }
    // For other routes
    return location.pathname.startsWith(href) && href !== '/';
  };

  // Get user role from auth context (you'll need to add this to your user object)
  const userRole = user?.role || 'farmer';

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => 
    item.role === 'all' || item.role === userRole
  );

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to={userRole === 'bank' ? '/bank-dashboard' : '/tableau-de-bord'} className="text-xl font-bold text-gray-900">
                Ekumen
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-8 sm:flex sm:items-center">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = isLinkActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      relative flex items-center px-4 h-16 text-sm font-medium
                      ${isActive 
                        ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black' 
                        : 'text-gray-500 hover:text-gray-700'
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
          {filteredNavigation.map((item) => {
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