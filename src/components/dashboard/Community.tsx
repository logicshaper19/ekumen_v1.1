import { MessageSquare, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function Community() {
  const discussions = [
    {
      id: 1,
      title: "Pratiques Agricoles Durables",
      author: "Marie Dubois",
      replies: 23,
      lastActivity: "il y a 2h"
    },
    {
      id: 2,
      title: "Actualités PAC 2024",
      author: "Jean Martin",
      replies: 45,
      lastActivity: "il y a 5h"
    },
    {
      id: 3,
      title: "Organisation du Marché Fermier Local",
      author: "Pierre Laurent",
      replies: 12,
      lastActivity: "il y a 1j"
    }
  ];

  const nearbyFarmers = [
    {
      id: 1,
      name: "Sophie Bernard",
      location: "Toulouse",
      farmType: "Maraîchage Bio"
    },
    {
      id: 2,
      name: "Lucas Moreau",
      location: "Montpellier",
      farmType: "Viticulture"
    },
    {
      id: 3,
      name: "Emma Petit",
      location: "Lyon",
      farmType: "Polyculture-élevage"
    }
  ];

  const partners = [
    {
      id: 1,
      name: "Crédit Agricole",
      type: "Banque",
      description: "Financement agricole et services bancaires spécialisés",
      category: "bank"
    },
    {
      id: 2,
      name: "Groupama",
      type: "Assurance",
      description: "Protection des exploitations et assurance récolte",
      category: "insurance"
    },
    {
      id: 3,
      name: "Chambre d'Agriculture Occitanie",
      type: "Institution",
      description: "Accompagnement technique et administratif",
      category: "chamber"
    },
    {
      id: 4,
      name: "BNP Agricole",
      type: "Banque",
      description: "Solutions de financement pour l'agriculture",
      category: "bank"
    },
    {
      id: 5,
      name: "MAAF Agriculture",
      type: "Assurance",
      description: "Solutions d'assurance pour exploitants agricoles",
      category: "insurance"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Communauté</h1>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          Nouvelle Discussion
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {discussion.title}
                </CardTitle>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {discussion.replies} réponses
                </span>
              </div>
              <CardDescription className="mt-1 flex items-center text-sm text-gray-500">
                <Users className="mr-1 h-4 w-4" />
                <span>{discussion.author}</span>
                <span className="mx-2">•</span>
                <span>{discussion.lastActivity}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Voir la discussion
                </button>
                <div className="flex items-center text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{discussion.replies}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nearbyFarmers.map((farmer) => (
          <Card key={farmer.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {farmer.name}
                </CardTitle>
              </div>
              <CardDescription className="mt-1 flex items-center text-sm text-gray-500">
                <span>{farmer.location}</span>
                <span className="mx-2">•</span>
                <span>{farmer.farmType}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Connecter
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {partner.name}
                </CardTitle>
              </div>
              <CardDescription className="mt-1 flex items-center text-sm text-gray-500">
                <span>{partner.type}</span>
                <span className="mx-2">•</span>
                <span>{partner.description}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Contacter
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}