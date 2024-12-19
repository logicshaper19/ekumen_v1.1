import React from 'react';
import { Sprout, Award, LineChart } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const UseCaseCard = ({ title, description, icon: Icon, href }: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(href)}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-full bg-[#00A9A3] bg-opacity-10">
          <Icon className="h-6 w-6 text-[#00A9A3]" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export function UseCases() {
  const useCases = [
    {
      title: "Rotation des Cultures",
      description: "Optimisez vos rendements et préservez vos sols grâce à des stratégies de rotation innovantes.",
      icon: Sprout,
      href: "/use-cases/crop-rotation"
    },
    {
      title: "Labels & Certifications",
      description: "Découvrez les opportunités de valorisation via les labels et certifications agricoles.",
      icon: Award,
      href: "/use-cases/labels"
    },
    {
      title: "Risques & Opportunités",
      description: "Analysez et anticipez les risques tout en identifiant les opportunités de développement.",
      icon: LineChart,
      href: "/use-cases/risks-opportunities"
    }
  ];

  return (
    <section id="use-cases" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cas d'Usage</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment transformer votre exploitation agricole avec nos solutions adaptées
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}
