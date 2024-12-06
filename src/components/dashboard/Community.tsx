import React from 'react';
import { MessageSquare, Users, Building2, Briefcase } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communauté</h1>
          <p className="mt-2 text-gray-600">
            Échangez avec d'autres agriculteurs et partagez vos expériences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <CardTitle>Discussions Récentes</CardTitle>
            </div>
            <CardDescription>Participez aux échanges avec d'autres agriculteurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussions.map(discussion => (
                <div key={discussion.id} className="flex items-start justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">{discussion.title}</h3>
                    <p className="text-sm text-gray-500">
                      Initié par {discussion.author} • {discussion.lastActivity}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{discussion.replies} réponses</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <CardTitle>Agriculteurs à Proximité</CardTitle>
            </div>
            <CardDescription>Connectez-vous avec les agriculteurs de votre région</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyFarmers.map(farmer => (
                <div key={farmer.id} className="flex items-start justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">{farmer.name}</h3>
                    <p className="text-sm text-gray-500">
                      {farmer.location} • {farmer.farmType}
                    </p>
                  </div>
                  <button className="text-sm text-black hover:text-black/80">
                    Connecter
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            <CardTitle>Partenaires Professionnels</CardTitle>
          </div>
          <CardDescription>Découvrez nos partenaires pour vous accompagner</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4">
              {partners.map(partner => (
                <div key={partner.id} className="flex items-start justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-black/5">
                      {partner.category === 'bank' ? (
                        <Building2 className="h-5 w-5 text-black" />
                      ) : partner.category === 'insurance' ? (
                        <Briefcase className="h-5 w-5 text-black" />
                      ) : (
                        <Users className="h-5 w-5 text-black" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{partner.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{partner.type}</p>
                      <p className="text-sm text-gray-600 mt-2">{partner.description}</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-black hover:text-black/80">
                    Contacter
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}