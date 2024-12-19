import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, ArrowRight, Leaf } from "lucide-react";

export function CropRotation() {
  const benefits = [
    {
      title: "Amélioration de la Fertilité",
      description: "Optimisez naturellement la qualité de vos sols",
      icon: Leaf
    },
    {
      title: "Réduction des Parasites",
      description: "Minimisez les risques de maladies et ravageurs",
      icon: Sprout
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Rotation des Cultures</h1>
        <p className="text-gray-600 mb-4">
          Optimisez vos rendements et préservez la santé de vos sols grâce à une rotation intelligente des cultures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-[#00A9A3] bg-opacity-10">
                    <Icon className="h-6 w-6 text-[#00A9A3]" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exemple de Rotation sur 4 Ans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-center">
              <div className="p-4 rounded-full bg-[#00A9A3] bg-opacity-10 mb-2">
                <Sprout className="h-8 w-8 text-[#00A9A3]" />
              </div>
              <p>Blé</p>
            </div>
            <ArrowRight className="text-gray-400" />
            <div className="text-center">
              <div className="p-4 rounded-full bg-[#00A9A3] bg-opacity-10 mb-2">
                <Sprout className="h-8 w-8 text-[#00A9A3]" />
              </div>
              <p>Colza</p>
            </div>
            <ArrowRight className="text-gray-400" />
            <div className="text-center">
              <div className="p-4 rounded-full bg-[#00A9A3] bg-opacity-10 mb-2">
                <Sprout className="h-8 w-8 text-[#00A9A3]" />
              </div>
              <p>Orge</p>
            </div>
            <ArrowRight className="text-gray-400" />
            <div className="text-center">
              <div className="p-4 rounded-full bg-[#00A9A3] bg-opacity-10 mb-2">
                <Sprout className="h-8 w-8 text-[#00A9A3]" />
              </div>
              <p>Protéagineux</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
