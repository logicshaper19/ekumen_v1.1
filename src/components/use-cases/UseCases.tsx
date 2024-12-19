import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Award, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface UseCaseCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const UseCaseCard = ({ title, description, icon: Icon, href }: UseCaseCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-[#00A9A3] bg-opacity-10">
            <Icon className="h-6 w-6 text-[#00A9A3]" />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-4">{description}</CardDescription>
        <Button 
          variant="outline" 
          className="text-[#00A9A3] border-[#00A9A3] hover:bg-[#00A9A3] hover:text-white"
          onClick={() => navigate(href)}
        >
          Explorer
        </Button>
      </CardContent>
    </Card>
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
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cas d'Usage</h1>
        <p className="text-gray-600">
          Explorez des scénarios concrets de transformation agricole et découvrez comment optimiser votre exploitation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <UseCaseCard key={index} {...useCase} />
        ))}
      </div>
    </div>
  );
}
