import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wheat,
  Droplets,
  Sun,
  Wind,
  Leaf,
  Sprout,
  CalendarDays
} from 'lucide-react';

const farmData = {
  crops: [
    {
      name: "Blé tendre",
      area: "15 ha",
      status: "En croissance",
      plantingDate: "15 Oct 2023",
      harvestDate: "Juil 2024",
      icon: Wheat
    },
    {
      name: "Maïs",
      area: "10 ha",
      status: "Planifié",
      plantingDate: "Avr 2024",
      harvestDate: "Sept 2024",
      icon: Sprout
    }
  ],
  conditions: [
    {
      name: "Irrigation",
      value: "Optimale",
      icon: Droplets,
      details: "Dernière irrigation: il y a 2 jours"
    },
    {
      name: "Ensoleillement",
      value: "Bon",
      icon: Sun,
      details: "12h/jour en moyenne"
    },
    {
      name: "Vent",
      value: "Faible",
      icon: Wind,
      details: "5-10 km/h"
    }
  ],
  nextActions: [
    {
      date: "25 Déc 2023",
      action: "Contrôle de la croissance du blé",
      type: "inspection"
    },
    {
      date: "2 Jan 2024",
      action: "Préparation du sol pour le maïs",
      type: "preparation"
    },
    {
      date: "15 Jan 2024",
      action: "Application d'engrais - Blé",
      type: "fertilization"
    }
  ]
};

export function Agriculteur() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Mon Exploitation</h1>
        <p className="text-gray-600">Vue d'ensemble de vos cultures et conditions</p>
      </div>

      {/* Cultures en cours */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Cultures en cours</h2>
        <div className="grid grid-cols-2 gap-6">
          {farmData.crops.map((crop, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <crop.icon className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">{crop.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">Surface: {crop.area}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {crop.status}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Semis</div>
                      <div className="font-medium">{crop.plantingDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Récolte prévue</div>
                      <div className="font-medium">{crop.harvestDate}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Conditions actuelles */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Conditions actuelles</h2>
        <div className="grid grid-cols-3 gap-6">
          {farmData.conditions.map((condition, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <condition.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{condition.name}</h3>
                    <p className="text-sm text-gray-500">{condition.value}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{condition.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Prochaines actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Prochaines actions</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {farmData.nextActions.map((action, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <CalendarDays className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">{action.action}</div>
                    <div className="text-sm text-gray-500">{action.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
