import React from 'react';
import { FormCategory } from '../../types/dashboard';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { DetailedForm } from '../../types/dashboard';

interface CategoryCardProps {
  category: FormCategory;
  onClick: (categoryId: string) => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={() => onClick(category.id)}
      className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
          {category.completion < 50 && (
            <div className="flex items-center mt-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Action requise</span>
            </div>
          )}
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500 mb-4">{category.description}</p>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progression</span>
          <span className="text-sm font-medium text-gray-900">{category.completion}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              category.completion === 100
                ? 'bg-black'
                : category.completion >= 50
                ? 'bg-black/80'
                : 'bg-yellow-500'
            }`}
            style={{ width: `${category.completion}%` }}
          />
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {category.completion === 100
          ? 'Tous les formulaires sont complétés'
          : category.completion === 0
          ? 'Aucun formulaire complété'
          : 'En cours de completion'}
      </div>
    </div>
  );
}