import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface Deadline {
  id: number;
  title: string;
  date: string;
  status: 'pending' | 'completed';
}

const deadlines: Deadline[] = [
  {
    id: 1,
    title: "Registre parcellaire graphique (RPG)",
    date: "31 Décembre 2024",
    status: "pending"
  },
  {
    id: 2,
    title: "Déclaration surface agricole",
    date: "31 Décembre 2024",
    status: "pending"
  },
  {
    id: 3,
    title: "Déclaration effectif animaux",
    date: "31 Décembre 2024",
    status: "pending"
  },
  {
    id: 4,
    title: "Registre d'élevage",
    date: "31 Décembre 2024",
    status: "pending"
  }
];

export function UpcomingDeclarations() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <CardTitle>Échéances à Venir</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between py-2"
            >
              <div>
                <h3 className="font-medium">{deadline.title}</h3>
                <p className="text-sm text-gray-600">{deadline.date}</p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                À faire
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
