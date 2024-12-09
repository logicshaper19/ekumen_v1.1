import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const upcomingDeclarations = [
  {
    id: 'phytosanitaires',
    title: "Rapport sur l'Utilisation des Produits Phytosanitaires",
    dueDate: "31 Décembre 2024",
    frequency: "Annuel",
    progress: 98,
  },
  {
    id: 'conformite-sante-securite',
    title: "Conformité en Santé et Sécurité",
    dueDate: "31 Décembre 2024",
    frequency: "Annuel",
    progress: 98,
  },
  {
    id: 'engrais-sols',
    title: "Gestion des Engrais et Sols",
    dueDate: "31 Décembre 2024",
    frequency: "Annuel",
    progress: 98,
  }
];

export function UpcomingDeclarations() {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/dashboard/declarations/${id}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Échéances à venir</h2>
      <div className="space-y-3">
        {upcomingDeclarations.map((declaration) => (
          <Card 
            key={declaration.id}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => handleClick(declaration.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1 pr-4">
                  <h3 className="font-medium">{declaration.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="space-x-4">
                      <span>Échéance: {declaration.dueDate}</span>
                      <span>Fréquence: {declaration.frequency}</span>
                    </div>
                    <span className="font-medium text-[#005E5D]">{declaration.progress}%</span>
                  </div>
                  <Progress 
                    value={declaration.progress} 
                    className="h-2"
                    indicatorClassName="bg-[#005E5D]"
                  />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
