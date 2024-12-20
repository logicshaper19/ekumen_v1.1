import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

// Mock data for recent chats
const recentChats = [
  {
    id: 1,
    farmerName: "Jean Dupont",
    location: "Marmande, 47200",
    lastMessage: "D'accord, je vais préparer les documents demandés pour le dossier de financement.",
    timestamp: "Il y a 30 min",
    unread: true,
  },
  {
    id: 2,
    farmerName: "Marie Martin",
    location: "Tonneins, 47400",
    lastMessage: "Merci pour les informations concernant les nouvelles options de crédit.",
    timestamp: "Il y a 2h",
    unread: false,
  },
  {
    id: 3,
    farmerName: "Pierre Dubois",
    location: "Agen, 47000",
    lastMessage: "Pouvons-nous planifier une visite de l'exploitation la semaine prochaine ?",
    timestamp: "Il y a 5h",
    unread: true,
  },
  {
    id: 4,
    farmerName: "Sophie Lambert",
    location: "Villeneuve-sur-Lot, 47300",
    lastMessage: "Le rendez-vous de demain à 14h est confirmé.",
    timestamp: "Hier",
    unread: false,
  }
];

export function RecentChats() {
  return (
    <Card className="p-4">
      <CardContent>
        <div className="space-y-4">
          {recentChats.map((chat) => (
            <Link key={chat.id} to={`/messages/${chat.id}`}>
              <div className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold">{chat.farmerName}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {chat.location}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{chat.lastMessage}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/messages" className="block mt-4">
          <Button variant="outline" className="w-full">
            <span>Voir toutes les conversations</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
