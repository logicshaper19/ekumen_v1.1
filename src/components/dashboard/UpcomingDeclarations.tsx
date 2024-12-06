import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const upcomingDeclarations = [
  {
    id: 1,
    title: "Gestion des Engrais et Sols",
    dueDate: "31 Décembre 2024",
    type: "Cultures",
    priority: "medium",
    completion: 45
  },
  {
    id: 2,
    title: "Rapport sur l'Utilisation des Produits Phytosanitaires",
    dueDate: "31 Décembre 2024",
    type: "Cultures",
    priority: "high",
    completion: 20
  },
  {
    id: 3,
    title: "Conformité en Santé et Sécurité",
    dueDate: "31 Décembre 2024",
    type: "Tous",
    priority: "high",
    completion: 65
  }
];

export function UpcomingDeclarations() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle>Échéances à Venir</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingDeclarations.map(declaration => (
            <div
              key={declaration.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className={`h-5 w-5 mt-0.5 ${
                  declaration.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <div>
                  <h4 className="font-medium text-gray-900">{declaration.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      Échéance: {declaration.dueDate}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                      {declaration.type}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Progression</span>
                      <span className="text-xs font-medium text-gray-700">{declaration.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          declaration.completion >= 80 ? 'bg-black' :
                          declaration.completion >= 40 ? 'bg-black/80' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${declaration.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="text-sm font-medium text-black hover:text-black/80">
                Voir
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}