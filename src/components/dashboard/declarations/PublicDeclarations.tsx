import React from 'react';
import { CategoryCard } from '../CategoryCard';
import { FormList } from '../FormList';
import { categories } from '../../../data/mockData';

interface PublicDeclarationsProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function PublicDeclarations({ selectedCategory, onSelectCategory }: PublicDeclarationsProps) {
  const selectedCategoryData = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)
    : null;

  return (
    <div className="space-y-6">
      {selectedCategory && selectedCategoryData ? (
        <FormList
          forms={selectedCategoryData.forms}
          categoryTitle={selectedCategoryData.title}
          onBack={() => onSelectCategory(null)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={onSelectCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
}