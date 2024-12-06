import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  to: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function NavButton({ to, icon: Icon, children, className = '' }: NavButtonProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center px-1 pt-1 text-sm font-medium ${
          isActive
            ? 'border-b-2 border-black text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
        } ${className}`
      }
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </NavLink>
  );
}