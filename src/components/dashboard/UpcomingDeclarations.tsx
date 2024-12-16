import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const upcomingDeclarations = [
  {
    id: 'phytosanitaires',
    title: "Rapport sur l'Utilisation des Produits Phytosanitaires",
    dueDate: "31 Décembre 2024"
  },
  {
    id: 'conformite-sante-securite',
    title: "Conformité en Santé et Sécurité",
    dueDate: "31 Décembre 2024"
  },
  {
    id: 'engrais-sols',
    title: "Gestion des Engrais et Sols",
    dueDate: "31 Décembre 2024"
  }
];

export function UpcomingDeclarations() {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/categories/upcoming/declarations/${id}/overview`);
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{declaration.title}</h3>
                  <p className="text-sm text-gray-500">Échéance: {declaration.dueDate}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
